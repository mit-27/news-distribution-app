import { DRIZZLE } from '@/core/drizzle/drizzle.module';
import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDB, news } from '@template/shared';
import { eq } from 'drizzle-orm';

@Injectable()
export class NewsService {

    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) { }


    async getNews() {
        const fetchednews = await this.db.select().from(news);
        return fetchednews;
    }

    async getNewsBySourceName(sourceName: string) {
        const fetchedNews = await this.db.select().from(news).where(eq(news.sourceName, sourceName));
        return fetchedNews;
    }



}
