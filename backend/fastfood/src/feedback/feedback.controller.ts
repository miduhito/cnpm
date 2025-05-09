/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() body: any) {
    return this.feedbackService.createFeedback(body);
  }
}
