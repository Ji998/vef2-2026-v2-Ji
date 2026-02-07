import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';
import {init,listTodos,createTodo} from './lib/db.js';
import {TodoTitleSchema} from'./lib/validation.js';



// búum til og exportum Hono app
export const app = new Hono();

// sendir út allt sem er í static möppunni
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', async (c) => {
  await init();

  const todos = await listTodos();
  if(todos==null){
    return c.html('Database error',500);
  }
  return c.html(<TodoPage todos={todos} />);
});

app.post('/add', async (c) => {
  await init();

  const body = await c.req.parseBody();
  const titleRaw = body.title;
  const title = typeof titleRaw === 'string' ? titleRaw : '';

  const parsed = TodoTitleSchema.safeParse(title);
  if (!parsed.success) {
    return c.html(
      <section>
        <h1>Error</h1>
        <p>{parsed.error.issues[0]?.message ?? 'Invalid input'}</p>
        <a href="/">til baka</a>
      </section>,
      400,
    );
  }

  const created = await createTodo(parsed.data);
  if (!created) {
    return c.html(
      <section>
        <h1>Database error</h1>
        <a href="/">Heim</a>
      </section>,
      500,
    );
  }

  return c.redirect('/');
});

app.post('/add', async (c) => {
  await init();

  const body = await c.req.parseBody();
  const titleRaw = body.title;
  const title = typeof titleRaw === 'string' ? titleRaw : '';

  const parsed = TodoTitleSchema.safeParse(title);
  if (!parsed.success) {
    return c.html(
      <section>
        <h1>Error</h1>
        <p>{parsed.error.issues[0]?.message ?? 'Invalid input'}</p>
        <a href="/">til baka</a>
      </section>,
      400,
    );
  }

  const created = await createTodo(parsed.data);
  if (!created) {
    return c.html(
      <section>
        <h1>Database error</h1>
        <a href="/">Heim</a>
      </section>,
      500,
    );
  }

  return c.redirect('/');
});
