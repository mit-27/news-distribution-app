import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SyncNewsService } from './sync/sync.news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, SyncNewsService],
  exports: [SyncNewsService]
})
export class NewsModule { }
