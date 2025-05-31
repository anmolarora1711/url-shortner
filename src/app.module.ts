import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configLoaders from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configLoaders,
    }),
    DatabaseModule,
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
