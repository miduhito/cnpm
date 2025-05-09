/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
  ) {}

 async createFeedback(data: any): Promise<Feedback> {
  const feedback = this.feedbackRepo.create({
    ID: uuidv4(),
    orderID: data.orderID,
    rating: data.rating,
    comment: data.comment,
  });
  return this.feedbackRepo.save(feedback);
}
}
