// src/lib/api-error.ts - 业务错误封装
export class BusinessError extends Error {
  public readonly code: number;
  public readonly statusCode: number;
  public readonly data?: unknown;

  constructor(code: number, message: string, statusCode = 400, data?: unknown) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
    this.name = 'BusinessError';
  }
}

// 预定义错误码
export const ErrorCodes = {
  // 系统级 (1-999)
  SUCCESS: 0,
  UNKNOWN_ERROR: 1,
  INVALID_PARAMS: 2,
  UNAUTHORIZED: 3,
  FORBIDDEN: 4,
  NOT_FOUND: 5,
  METHOD_NOT_ALLOWED: 6,
  TIMEOUT: 7,
  
  // 业务级 (1000+)
  USER_NOT_FOUND: 1001,
  USER_EXISTS: 1002,
  INVALID_PASSWORD: 1003,
  TOKEN_EXPIRED: 1004,
  RATE_LIMIT: 1005
} as const;