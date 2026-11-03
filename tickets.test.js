const test = require('node:test');
const assert = require('node:assert');
const { newStore, createTicket, openTickets } = require('./src/tickets');

test('createTicket assigns sequential ids and defaults', () => {
  const store = newStore();
  const t = createTicket(store, { subject: '登录失败', createdAt: '2026-11-03T07:31:00.000Z' });
  assert.strictEqual(t.id, 1);
  assert.strictEqual(t.priority, 'normal');
  assert.strictEqual(t.status, 'open');
});

test('openTickets filters by status', () => {
  const store = newStore();
  createTicket(store, { subject: 'a' });
  const t = createTicket(store, { subject: 'b' });
  t.status = 'closed';
  assert.strictEqual(openTickets(store).length, 1);
});
