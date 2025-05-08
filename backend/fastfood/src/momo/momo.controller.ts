/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Query,Post,HttpCode,Body } from '@nestjs/common';
import { MomoService } from './momo.service';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Get('create-payment')
  async createPayment(@Query('amount') amount: string) {
    const payUrl = await this.momoService.createPayment(amount);
    return { payUrl };
  }
  // Nhận callback từ MoMo (IPN)
  @Post('notify')
  @HttpCode(200)
  async handleMomoCallback(@Body() body: any) {
    console.log('✅ Dữ liệu IPN từ MoMo:', body);

    const {
      orderId,
      requestId,
      amount,
      resultCode,
      message,
      transId,
      orderInfo,
    } = body;

    if (resultCode === 0) {
      console.log('🎉 Giao dịch thành công:', {
        orderId,
        requestId,
        amount,
        transId,
      });

      // TODO: cập nhật trạng thái đơn hàng trong database (VD: Paid)
    } else {
      console.warn('❌ Giao dịch thất bại:', { resultCode, message });
      
      // TODO: xử lý đơn hàng thất bại nếu cần
    }

    return { message: 'Callback received successfully' };
  }
}
