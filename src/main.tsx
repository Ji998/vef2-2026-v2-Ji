import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';

// búum til og exportum Hono app
export const app = new Hono();

// sendir út allt sem er í static möppunni
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', async (c) => {
  return c.html(<TodoPage todos={[1, 2, 3]} />);
});
