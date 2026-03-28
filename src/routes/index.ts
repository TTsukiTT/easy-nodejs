// src/routes/index.ts
import AuthRoutes from './auth-routes.js';
import TestRoutes from './test-routes.js';
import { Rest, apiRouter } from '../lib/rest.js';
import type express from 'express';

//增加路由时，需要在 allRoutes 中添加
const allRoutes = [...AuthRoutes.routes, ...TestRoutes.routes];

export function registerRoutes(app: express.Express): void {
  allRoutes.forEach(route => {
    const handler = route.handler;
    console.log('注册路由', route)
    Rest[route.method](AuthRoutes.basePath + route.path, handler);
  })
  app.use('/api', apiRouter);
}