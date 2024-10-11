import { DRIZZLE } from "@/core/drizzle/drizzle.module";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { DrizzleDB, news } from "@template/shared";
import axios from "axios";
import { PinoLogger } from "nestjs-pino";
import { NewsFromAPIDataType } from "../types";



@Injectable()
export class SyncNewsService implements OnModuleInit {

    constructor(
        @Inject(DRIZZLE) private readonly db: DrizzleDB,
        private readonly logger: PinoLogger,
    ) { }

    onModuleInit() {
        this.logger.info('Syncing news');
        // this.fetchNews();
    }


    async fetchNews() {

        //TODO - Fetch from news api and add into postgres and orama

        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=us`,
            {
                headers: {
                    "X-Api-Key": process.env.NEWS_API_KEY,
                }
            }
        );

        const newsData: NewsFromAPIDataType[] = response.data.articles;
        this.logger.info(`fetched data : ${JSON.stringify(newsData)}`)
        this.ingestNews(newsData);

    }

    async ingestNews(data: NewsFromAPIDataType[]) {

        for (const currentNews of data) {
            try {
                if (currentNews.description !== null) {
                    await this.db.insert(news).values({
                        id: currentNews.url,
                        description: currentNews.description,
                        imageUrl: currentNews.urlToImage,
                        sourceName: currentNews.source?.name,
                        title: currentNews.title,
                    });
                }

            }
            catch (error) {
                this.logger.error(`Failed to insert news : ${JSON.stringify(currentNews)}`);
            }
        }
    }
}