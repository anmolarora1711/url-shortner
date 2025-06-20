import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { Counter, CounterDocument } from './schemas/counter.schema';
import { Base62 } from '../utils/base62';
@Injectable()
export class UrlService {
  private base62: Base62 = new Base62();

  constructor(
    @InjectModel('Url') private readonly urlModel: Model<Url>,
    @InjectModel('Counter') private readonly counterModel: Model<Counter>,
  ) {}

  async getShorten(longUrl: string): Promise<string> {
    // Check if already exists
    const existing = await this.urlModel.findOne({ longUrl });
    if (existing) return existing.shortCode;

    let id: CounterDocument;
    try {
      id = await this.counterModel.findOneAndUpdate(
        {
          type: 'url-counter',
        },
        {
          $inc: { counter: 1 },
        },
        {
          new: true,
          upsert: true,
        },
      );
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const shortCode = this.base62.encode(id.counter);

    try {
      await this.urlModel.create({ longUrl, shortCode });
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return shortCode;
  }

  async getRedirectUrl(shortCode: string): Promise<string> {
    // Check if exists
    const existing = await this.urlModel.findOne({ shortCode });
    if (!existing) {
      throw new HttpException(
        'Original Url not exists in DB for the given code',
        HttpStatus.NOT_FOUND,
      );
    }
    const url = existing.longUrl;
    return url;
  }
}
