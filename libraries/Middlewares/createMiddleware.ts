import middy from "middy";
import { jsonBodyParser, validator, httpErrorHandler } from "middy/middlewares";

export function createUserMiddleware(handler: any, inputSchema: any) {
  return middy(handler)
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(httpErrorHandler());
}
