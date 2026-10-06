import {
  Component,
  inject
} from '@angular/core';

import {
  TicketStore
} from '../data-access/ticket.store';

import { UserStore } from '../../users/data-access/user.store';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent {

  readonly ticketStore =
    inject(TicketStore);
 readonly userStore = inject(UserStore);
  onSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.ticketStore
      .setSearchTerm(input.value);
  }

  onStatusChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.ticketStore
      .setStatusFilter(select.value);
  }

  onPriorityChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.ticketStore
      .setPriorityFilter(select.value);
  }

  clearFilters(): void {
    this.ticketStore.clearFilters();
  }
}