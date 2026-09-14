import { defineMiddleware } from "nitro";

export default defineMiddleware((event) => {
  if (event.url.pathname.startsWith('/api')) {
    event.req.headers.append('x-cg-demo-api-key', process.env.COIN_GECKO_API_KEY || '');
  }
  
});