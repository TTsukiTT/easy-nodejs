// src/middleware/validator.ts - 参数验证封装
import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { BusinessError, ErrorCodes } from '../lib/api-error.js';

type Validator<T> = (data: unknown) => { success: true; data: T } | { success: false; error: string };

export const validateBody = <T>(validator: Validator<T>): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = validator(req.body);

    if (!result.success) {
      throw new BusinessError(ErrorCodes.INVALID_PARAMS, result.error, 400);
    }

    // 类型安全的 body
    //@eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (req as any).validatedBody = result.data;
    next();
  };
};

// 常用验证器
export const Validators = {
  // 用户创建
  createUser: (data: unknown) => {
    if (!data || typeof data !== 'object') {
      return { success: false as const, error: 'Body must be an object' };
    }

    const { name, email, age } = data as Record<string, unknown>;

    if (!name || typeof name !== 'string' || name.length < 2) {
      return { success: false as const, error: 'Name must be at least 2 characters' };
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return { success: false as const, error: 'Valid email required' };
    }

    if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 150)) {
      return { success: false as const, error: 'Age must be between 0-150' };
    }

    return {
      success: true as const,
      data: { name, email, age: age as number | undefined }
    };
  }
};