import { Controller } from '@nestjs/common';
import { NewsService } from './news.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract } from '@template/shared';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) { }


  @TsRestHandler(contract.news)
  async newsController() {

    return tsRestHandler(contract.news, {
      getNews: async () => {
        const news = await this.newsService.getNews();
        if (!news) {
          return {
            status: 400,
            body: { message: "Failed to get news" }
          }
        }
        return {
          status: 200,
          body: news
        }
      },
      getNewsBySourceName: async (parmas) => {
        const news = await this.newsService.getNewsBySourceName(parmas.params.sourceName);
        if (!news) {
          return {
            status: 400,
            body: { message: "Failed to get news" }
          }
        }
        return {
          status: 200,
          body: news
        }
      },
    })
  }







}
