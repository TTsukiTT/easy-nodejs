// src/middleware/error-handler.ts - 全局错误处理
import type { Request, Response, NextFunction } from 'express';
import { ApiResult } from '../lib/api-response.js';
import { BusinessError, ErrorCodes } from '../lib/api-error.js';

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): any => {
    console.error('[Error]', err);

    // 业务错误
    if (err instanceof BusinessError) {
        const data = err.data === undefined ? null : err.data as unknown;

        return res.status(err.statusCode).json(
            ApiResult.error(err.code, err.message, data as null)
        );
    }

    // Express 验证错误
    if (err.name === 'ValidationError') {
        return res.status(400).json(
            ApiResult.error(ErrorCodes.INVALID_PARAMS, err.message)
        );
    }
    // 默认 500
    return res.status(500).json(
        ApiResult.error(ErrorCodes.UNKNOWN_ERROR, err.message || 'Internal Server Error')
    );
};