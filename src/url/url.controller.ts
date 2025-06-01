import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shorten(@Body('longUrl') longUrl: string) {
    const shortCode = await this.urlService.getShorten(longUrl);
    return { shortUrl: `http://localhost:3000/${shortCode}` };
  }
}
