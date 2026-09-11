import { defineMiddleware } from "nitro";

export default defineMiddleware((event) => {
  event.req.headers.append('x-cg-demo-api-key', process.env.COIN_GECKO_API_KEY || '');
  console.log('middleware', event.req.headers);
});