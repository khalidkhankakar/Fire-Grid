import { Hono } from 'hono';
import { handle } from 'hono/vercel';


const app = new Hono().basePath('/api')

app.get('/hello/', async (c) => {
  return c.json({ message: 'Hello from FireGrid' })
})


const handler = handle(app)
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
