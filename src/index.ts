// src/index.ts - 主入口组装
import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import { registerRoutes } from '#routes/index';

const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 健康检查
app.get('/health', (_req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// 注册路由
registerRoutes(app);



// 404 处理
app.use((_req, res) => {
  res.status(404).json({
    code: 5,
    data: null,
    message: 'API endpoint not found',
    timestamp: new Date().toISOString(),
    requestId: `${Date.now()}`
  });
});

// 全局错误处理（必须放在最后）
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Server ready at http://localhost:${PORT}`);
});