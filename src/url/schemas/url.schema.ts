import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Url extends Document {
  @Prop({ required: true })
  longUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop()
  expiryDate?: Date;

  @Prop({ default: 0 })
  clickCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
