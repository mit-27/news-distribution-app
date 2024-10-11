import { initContract } from '@ts-rest/core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { news } from '../../db/schema';

const c = initContract();

const NewsSchema = createSelectSchema(news);

const ErrorSchema = z.object({
    message: z.string(),
});

export const newsContract = c.router(
    {
        getNews: {
            method: 'GET',
            path: '/news',
            responses: {
                200: NewsSchema.array(),
                400: ErrorSchema,
            },
            summary: 'Get All News',
        },
        getNewsBySourceName: {
            method: 'GET',
            path: '/news/source/:sourceName',
            pathParams: z.object({
                sourceName: z.string(),
            }),
            responses: {
                200: NewsSchema.array(),
                400: ErrorSchema,
            },
            summary: 'Get All News by Source Name',
        },


    }
)