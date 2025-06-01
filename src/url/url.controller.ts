import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shorten(@Body('longUrl') longUrl: string) {
    const shortCode = await this.urlService.getShorten(longUrl);
    return { shortUrl: `http://localhost:3000/${shortCode}` };
  }

  @Get('/:code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const originalUrl = await this.urlService.getRedirectUrl(code);
    res.redirect(originalUrl);
  }
}
