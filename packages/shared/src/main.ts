// contract.ts

import { initContract } from '@ts-rest/core';
import { newsContract } from './routers/news';
import { userContract } from './routers/users';
import { z } from 'zod';

const c = initContract();

export const contract = c.router(
    {
        news: newsContract,
        users: userContract,
    },
    { pathPrefix: '/api', strictStatusCodes: true }
);


// export * from './db';
export * from './db/schema';
export * from './db/types';