import type { Controller } from "#types/Controller";
import type { Request } from "express";


export default {
    basePath: '/test/',
    routes: [
        {
            path: '/test2',
            method: 'get',
            handler: test,

        }
    ]
} as Controller;

function test(req: Request): { name: string, req: Request } {
    return { name: 'Test passed', req: req };
}



