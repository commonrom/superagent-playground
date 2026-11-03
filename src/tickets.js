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

module.exports = { newStore, createTicket, openTickets };
