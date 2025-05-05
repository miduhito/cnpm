/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoService {
    private readonly partnerCode = 'MOMO';
    private readonly accessKey = 'F8BBA842ECF85';
    private readonly secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    private readonly endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';
    private readonly redirectUrl = 'https://momo.vn/return';
    private readonly ipnUrl = 'https://callback.url/notify';

    async createPayment(amount: string): Promise<string> {
    const requestId = this.partnerCode + Date.now();
    const orderId = requestId;
    const orderInfo = 'pay with MoMo';
    const requestType = 'captureWallet';
    const extraData = '';

    // Tạo raw signature
    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${this.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Tạo chữ ký HMAC SHA256
    const signature = crypto
    .createHmac('sha256', this.secretKey)
    .update(rawSignature)
    .digest('hex');

    // Body gửi đi
    const requestBody = {
    partnerCode: this.partnerCode,
    accessKey: this.accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl: this.redirectUrl,
    ipnUrl: this.ipnUrl,
    extraData,
    requestType,
    signature,
      lang: 'en',
    };

    try {
        const res = await axios.post<{ payUrl: string }>(this.endpoint, requestBody, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        return res.data.payUrl;          
    } catch (error) {
    console.error('Lỗi gọi MoMo:', error.response?.data || error.message);
    throw new Error('Gọi thanh toán MoMo thất bại');
    }
    }   
}
