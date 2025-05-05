/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { MomoService } from './momo.service';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Get('create-payment')
  async createPayment(@Query('amount') amount: string) {
    const payUrl = await this.momoService.createPayment(amount);
    return { payUrl };
  }
}
