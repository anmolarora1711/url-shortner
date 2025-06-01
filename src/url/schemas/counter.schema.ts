import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter {
  @Prop({ required: true, default: 1 })
  counter: number;

  @Prop({ default: 'url-counter' })
  type: string;
}

export type CounterDocument = Counter & Document;

export const CounterSchema = SchemaFactory.createForClass(Counter);
