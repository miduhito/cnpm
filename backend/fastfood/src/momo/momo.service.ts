/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoService {
  private readonly partnerCode = 'MOMO';
  private readonly accessKey = 'F8BBA842ECF85';
  private readonly secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  private readonly endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';
  private readonly redirectUrl = 'https://82cb-171-243-48-84.ngrok-free.app/momo/return';
  private readonly ipnUrl = 'hhttps://webhook.site/13eed36c-82af-4e44-9d94-8b2723338c43';

  async createPayment(amount: string): Promise<string> {
    const requestId = 'MOMO' + Date.now(); // ví dụ: MOMO1715075678901
    const orderId = requestId;  // Đây sẽ là ID đơn hàng, có thể đổi theo ý bạn
    const orderInfo = 'pay with MoMo';
    const requestType = 'captureWallet';
    const extraData = '';  // Dữ liệu bổ sung, có thể để trống

    // Tạo raw signature
    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${this.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Tạo chữ ký HMAC SHA256
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    // Tạo requestBody để gửi cho MoMo
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
      // Gọi API MoMo để tạo thanh toán
      console.log('requestBody:', requestBody);
      console.log('rawSignature:', rawSignature);
      console.log('signature:', signature);
      const res = await axios.post<{ payUrl: string }>(this.endpoint, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res.data.payUrl;  // Trả về link thanh toán MoMo (QR code URL)
    } catch (error) {
      console.error('Lỗi gọi MoMo:', error.response?.data || error.message);
      throw new Error('Gọi thanh toán MoMo thất bại');
    }
  }
}
