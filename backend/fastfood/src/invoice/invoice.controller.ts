/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() invoice: Invoice) {
    return this.invoiceService.create(invoice);
  }
}
