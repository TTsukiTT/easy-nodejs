// src/index.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { ApiResult } from './lib/api-response.js';
import { errorHandler } from './middleware/error-handler.js';

// 创建测试应用
function createTestApp() {
  const app = express();
  app.use(express.json());

  // 健康检查
  app.get('/health', (_req, res) => {
    res.json(ApiResult.success({ status: 'UP' }));
  });

  // 404
  app.use((_req, res) => {
    res.status(404).json(ApiResult.error(5, 'Not found'));
  });

  // 错误处理
  app.use(errorHandler);

  return app;
}

describe('API Server', () => {
  const app = createTestApp();

  it('GET /health should return UP status', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.code).toBe(0);
    expect(res.body.data.status).toBe('UP');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('requestId');
  });

  it('unknown route should return 404', async () => {
    const res = await request(app).get('/unknown');

    expect(res.status).toBe(404);
    expect(res.body.code).toBe(5);
  });
});