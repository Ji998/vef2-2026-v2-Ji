import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';
import { init, listTodos, createTodo, deleteTodo , updateTodo} from './lib/db.js';
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

app.post('/delete/:id', async (c) => {
  await init();

  const id = Number(c.req.param('id'));
  if (!Number.isFinite(id)) {
    return c.html('Invalid id', 400);
  }

  const res = await deleteTodo(id);
  if (res === null) {
    return c.html('Database error', 500);
  }

  return c.redirect('/');
});


app.post('/toggle/:id',async(c)=>{
  await init();
  console.log('toggle param id =', c.req.param('id'));
  
  const id= Number(c.req.param('id'));
  if(!Number.isFinite(id)) return c.html('Wrong id' ,400);

  const todos = await listTodos();
  if(!todos) return c.html('Database error',500);

  const todo= todos.find((t) => t.id== id);
  if(!todo) return c.html('Not find', 404);

  const updated = await updateTodo(id,todo.title,!todo.finished);
  if(!updated) return c.html('database error',500);

  return c.redirect('/');



})
