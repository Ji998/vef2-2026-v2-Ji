import type { FC } from 'hono/jsx';

import type { Todo } from '../types.js';

type TodoPageProps = {
  todos?: Todo[];
};

export const TodoPage: FC<TodoPageProps> = ({ todos = [] }) => {
  return (
    <section>
      <p>Halló hono heimur!</p>
      <p>Ég fékk {todos.length} verkefni.</p>
    </section>
  );
};
