import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './core/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';
import { CoreSharedModule } from './core/core.module';
import { LoggerModule } from 'nestjs-pino';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          }
        },
      },
    }),
    CoreSharedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
