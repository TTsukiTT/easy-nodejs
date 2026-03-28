// src/lib/api-response.ts - 统一响应封装
export interface ApiResponse<T = unknown> {
  code: number;
  data: T | null;
  message: string;
  timestamp: string;
  requestId: string;
}

export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export class ApiResult {
  static success<T>(data: T, message = 'success'): ApiResponse<T> {
    return {
      code: 0,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: generateRequestId()
    };
  }

  static paginated<T>(
    list: T[],
    total: number,
    page: number,
    pageSize: number
  ): ApiResponse<PaginatedData<T>> {
    return this.success({
      list,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total
    });
  }

  static error(code: number, message: string, data: null = null): ApiResponse<null> {
    return {
      code,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: generateRequestId()
    };
  }
}

function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}