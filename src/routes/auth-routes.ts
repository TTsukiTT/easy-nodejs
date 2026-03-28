import type { Controller } from "#types/Controller";
import type { Request } from "express";

//@RestController
//@RequestMapping('/auth/')
export default {
    basePath: '/auth/',
    routes: [
        {
            path: 'test',
            method: 'get',
            handler: test,

        }
    ]
} as Controller




function test(req: Request): { name: string } {
    console.log('测试路由', req.query);
    return { name: 'Test passed' };
}



