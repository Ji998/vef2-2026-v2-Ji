import type { FC } from 'hono/jsx';
import type { Todo } from '../types.js';

type TodoPageProps = {
  todos?: Todo[];
};

export const TodoPage: FC<TodoPageProps> = ({ todos = [] }) => {
  return (
    <html lang="is">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Verkefni</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        <main>
          <section>
            <h1>Verkefni</h1>

            <form method="post" action="/add">
              <label>
                Verkefni: <input type="text" name="title" />
              </label>
              <button type="submit">Bæta við</button>
            </form>

            {todos.length === 0 ? (
              <p>Ekkert að gera</p>
            ) : (
              <>
                <ul>
                  {todos.map((t) => (
                    <li key={t.id}>
                      {t.title} {t.finished ? '(finished)' : ''}

                      <form
                        method="post"
                        action={`/toggle/${String(t.id)}`}
                        style="display: inline; margin-left: 8px;"
                      >
                        <button type="submit">
                          {t.finished ? 'hætta við' : 'buinn'}
                        </button>
                      </form>

                      <form
                        method="post"
                        action={`/delete/${String(t.id)}`}
                        style="display: inline; margin-left: 8px;"
                      >
                        <button type="submit">eyða</button>
                      </form>
                    </li>
                  ))}
                </ul>

                {todos.some((t) => t.finished) ? (
                  <form
                    method="post"
                    action="/delete/finished"
                    style="margin-top: 12px;"
                  >
                    <button type="submit">delete all finished</button>
                  </form>
                ) : null}
              </>
            )}

            <p>Halló hono heimur!</p>
            <p>Ég fékk {todos.length} verkefni.</p>
          </section>
        </main>
      </body>
    </html>
  );
};
