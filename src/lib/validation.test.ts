import test from 'node:test';
import assert from 'node:assert/strict';

import { TodoTitleSchema } from './validation.js';

void test('TodoTitleSchema: rejects empty/whitespace-only title', () => {
  assert.equal(TodoTitleSchema.safeParse('').success, false);
  assert.equal(TodoTitleSchema.safeParse('   ').success, false);
});

void test('TodoTitleSchema: accepts trimmed non-empty title', () => {
  const r = TodoTitleSchema.safeParse('  milk  ');
  assert.equal(r.success, true);

  // after the assert above, TS may treat r.success as always true
  assert.equal(r.data, 'milk');
});
