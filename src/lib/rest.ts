// src/lib/rest.ts
import { ApiResult } from "@/lib/api-response.js";
import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

const router: Router = Router();

export class Rest {
    static get<T>(path: string, cb: (req: Request) => T | Promise<T>): void {
        router.get(path, (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(cb(req)).then(
                (data) => res.json(ApiResult.success(data)),
                (error) => next(error)
            );
        });
    }

    static post<T>(path: string, cb: (req: Request) => T | Promise<T>): void {
        router.post(path, (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(cb(req)).then(
                (data) => res.json(ApiResult.success(data)),
                (error) => next(error)
            );
        });
    }

    static put<T>(path: string, cb: (req: Request) => T | Promise<T>): void {
        router.put(path, (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(cb(req)).then(
                (data) => res.json(ApiResult.success(data)),
                (error) => next(error)
            );
        });
    }

    static delete<T>(path: string, cb: (req: Request) => T | Promise<T>): void {
        router.delete(path, (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(cb(req)).then(
                (data) => res.json(ApiResult.success(data)),
                (error) => next(error)
            );
        });
    }

    // 关键：暴露 router 实例
    static getRouter(): Router {
        return router;
    }
}

export const apiRouter = router;