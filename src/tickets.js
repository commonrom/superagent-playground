/** A minimal ticket store for the support-desk prototype. */
function newStore() {
  return { nextId: 1, tickets: [] };
}

function createTicket(store, data) {
  const ticket = {
    id: store.nextId++,
    subject: data.subject,
    priority: data.priority ?? 'normal',
    status: 'open',
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
  store.tickets.push(ticket);
  return ticket;
}

function openTickets(store) {
  return store.tickets.filter(t => t.status === 'open');
}

const CSV_COLUMNS = ['id', 'subject', 'priority', 'status', 'createdAt'];
const CSV_DELIMITER = ';';
const UTF8_BOM = '\uFEFF';

function csvField(value) {
  const text = String(value ?? '');
  if (!/[;"\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function exportCsv(store) {
  const lines = [CSV_COLUMNS.join(CSV_DELIMITER)];
  for (const ticket of store.tickets) {
    lines.push(CSV_COLUMNS.map(column => csvField(ticket[column])).join(CSV_DELIMITER));
  }
  return UTF8_BOM + lines.join('\n');
}

module.exports = { newStore, createTicket, openTickets, exportCsv };
