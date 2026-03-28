import type { Request } from "express";

export type Controller = {
    basePath: string,
    routes: {
        path: string,
        method: 'get' | 'post' | 'put' | 'delete',
        handler: (req: Request) => unknown
    }[]
}