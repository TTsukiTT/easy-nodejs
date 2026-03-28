// src/lib/route-wrapper.ts - 路由处理封装
import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiResult } from './api-response.js';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export const route = (handler: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // 显式返回 void，不 await
    handler(req, res, next).then(
      (result) => {
        if (res.headersSent) return;
        res.json(ApiResult.success(result));
      },
      (error) => {
        next(error);
      }
    );
  };
};

// 分页参数提取
export const getPagination = (req: Request): { page: number; pageSize: number; offset: number } => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize as string) || 20));
  return { page, pageSize, offset: (page - 1) * pageSize };
};