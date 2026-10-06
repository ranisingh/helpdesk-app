import {
  computed,
  Injectable,
  signal
} from '@angular/core';

import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketStore {

  //For save data in local storage//
  private readonly storageKey = 'helpdesk_tickets';


 private readonly _tickets =
  signal<Ticket[]>(this.loadTickets());

  private loadTickets(): Ticket[] {

  const data =
    localStorage.getItem(this.storageKey);

  if (!data) {

  const initialTickets =
    this.getInitialTickets();

  localStorage.setItem(
    this.storageKey,
    JSON.stringify(initialTickets)
  );

  return initialTickets;
}

  try {

    const tickets =
      JSON.parse(data) as Ticket[];

    return tickets.map(ticket => ({
      ...ticket,
      createdAt: new Date(ticket.createdAt)
    }));

  } catch {

    return [];

  }
}

  
  readonly tickets =
    this._tickets.asReadonly();

  readonly totalTickets = computed(() =>
    this._tickets().length
  );

  readonly openTickets = computed(() =>
    this._tickets()
      .filter(ticket => ticket.status === 'Open')
      .length
  );

  readonly inProgressTickets = computed(() =>
    this._tickets()
      .filter(ticket => ticket.status === 'In Progress')
      .length
  );

  readonly resolvedTickets = computed(() =>
    this._tickets()
      .filter(ticket => ticket.status === 'Resolved')
      .length
  );

  readonly highPriorityTickets = computed(() =>
    this._tickets()
      .filter(ticket =>
        ticket.priority === 'High' ||
        ticket.priority === 'Critical'
      )
      .length
  );


  readonly searchTerm = signal('');

readonly statusFilter = signal<string>('All');

readonly priorityFilter = signal<string>('All');

readonly filteredTickets = computed(() => {

  const search = this.searchTerm()
    .trim()
    .toLowerCase();

  const status = this.statusFilter();

  const priority = this.priorityFilter();

  return this._tickets().filter(ticket => {

    const matchesSearch =
      ticket.title.toLowerCase().includes(search) ||
      ticket.category.toLowerCase().includes(search) ||
      ticket.createdBy.toLowerCase().includes(search);

    const matchesStatus =
      status === 'All' ||
      ticket.status === status;

    const matchesPriority =
      priority === 'All' ||
      ticket.priority === priority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });
});


setSearchTerm(value: string): void {
  this.searchTerm.set(value);
}

setStatusFilter(value: string): void {
  this.statusFilter.set(value);
}

setPriorityFilter(value: string): void {
  this.priorityFilter.set(value);
}

clearFilters(): void {
  this.searchTerm.set('');
  this.statusFilter.set('All');
  this.priorityFilter.set('All');
}

//Add New Ticket///
addTicket(ticket: Ticket): void {

  this._tickets.update(currentTickets => [
    ticket,
    ...currentTickets
  ]);
  this.saveTickets();
}
private saveTickets(): void {

  localStorage.setItem(
    this.storageKey,
    JSON.stringify(this._tickets())
  );

}

//Get ticket by Id//
getTicketById(id: number): Ticket | undefined {
  return this._tickets().find(
    ticket => ticket.id === id
  );
}




updateTicket(updatedTicket: Ticket): void {
  this._tickets.update(tickets =>
    tickets.map(ticket =>
      ticket.id === updatedTicket.id
        ? updatedTicket
        : ticket
    )
  );

  this.saveTickets();
}


//Load Intial Data//
private getInitialTickets(): Ticket[] {

  return [
    {
      id: 1001,
      title: 'Unable to login',
      description: 'User cannot login to the customer portal.',
      category: 'Application',
      status: 'Open',
      priority: 'High',
      createdBy: 'Rani',
      assignedToUserId: 1,
      createdAt: new Date()
    },
    {
      id: 1002,
      title: 'Outlook not receiving emails',
      description: 'Customer is unable to receive emails.',
      category: 'Email',
      status: 'In Progress',
      priority: 'Medium',
      createdBy: 'David',
      assignedToUserId: 2,
      createdAt: new Date()
    },
    {
      id: 1003,
      title: 'VPN connection issue',
      description: 'VPN connection disconnects frequently.',
      category: 'Network',
      status: 'Resolved',
      priority: 'Critical',
      createdBy: 'Sara',
      assignedToUserId: 3,
      createdAt: new Date()
    },
    {
      id: 1004,
      title: 'Laptop keyboard issue',
      description: 'Several keyboard keys are not working.',
      category: 'Hardware',
      status: 'Closed',
      priority: 'Low',
      createdBy: 'Mike',
      assignedToUserId: 1,
      createdAt: new Date()
    }
  ];
}
}