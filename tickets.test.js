const test = require('node:test');
const assert = require('node:assert');
const { newStore, createTicket, openTickets, exportCsv } = require('./src/tickets');

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

test('exportCsv writes the agreed header and rows in ticket order', () => {
  const store = newStore();
  createTicket(store, { subject: '登录失败', priority: 'high', createdAt: '2026-11-03T07:31:00.000Z' });
  createTicket(store, { subject: '报表打不开', createdAt: '2026-11-03T09:00:00.000Z' });

  assert.strictEqual(
    exportCsv(store),
    [
      'id,subject,priority,status,createdAt',
      '1,登录失败,high,open,2026-11-03T07:31:00.000Z',
      '2,报表打不开,normal,open,2026-11-03T09:00:00.000Z',
    ].join('\n')
  );
});

test('exportCsv returns just the header when the store is empty', () => {
  assert.strictEqual(exportCsv(newStore()), 'id,subject,priority,status,createdAt');
});

test('exportCsv exports every ticket regardless of status', () => {
  const store = newStore();
  createTicket(store, { subject: 'a', createdAt: '2026-11-03T07:31:00.000Z' });
  createTicket(store, { subject: 'b', createdAt: '2026-11-03T08:00:00.000Z' }).status = 'closed';

  assert.deepStrictEqual(exportCsv(store).split('\n').slice(1), [
    '1,a,normal,open,2026-11-03T07:31:00.000Z',
    '2,b,normal,closed,2026-11-03T08:00:00.000Z',
  ]);
});

test('exportCsv quotes fields containing commas, quotes or newlines', () => {
  const store = newStore();
  createTicket(store, {
    subject: '登录失败, 改了密码',
    createdAt: '2026-11-03T07:31:00.000Z',
  });
  createTicket(store, {
    subject: '他说"打不开"\n已经反馈',
    createdAt: '2026-11-03T09:00:00.000Z',
  });

  assert.strictEqual(
    exportCsv(store),
    [
      'id,subject,priority,status,createdAt',
      '1,"登录失败, 改了密码",normal,open,2026-11-03T07:31:00.000Z',
      '2,"他说""打不开""\n已经反馈",normal,open,2026-11-03T09:00:00.000Z',
    ].join('\n')
  );
});
