import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlSchema } from './schemas/url.schema';
import { CounterSchema } from './schemas/counter.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Url', schema: UrlSchema },
      { name: 'Counter', schema: CounterSchema },
    ]),
  ],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [UrlService],
})
export class UrlModule {}
