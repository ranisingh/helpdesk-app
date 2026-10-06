import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { FormsModule } from '@angular/forms';

import {
  TicketStore
} from '../data-access/ticket.store';

import {
  TicketStatus,
  TicketPriority
} from '../models/ticket.model';
import {
  NotificationService
} from '../../../core/services/notification.service';
import { UserStore } from '../../users/data-access/user.store';
@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss'
})
export class TicketDetailsComponent {
private readonly notificationService = inject(NotificationService);
 private readonly route = inject(ActivatedRoute);

  readonly ticketStore = inject(TicketStore);
  readonly userStore = inject(UserStore);

   readonly ticketId = Number(
    this.route.snapshot.paramMap.get('id')
  );

   readonly ticket = computed(() =>
    this.ticketStore
      .tickets()
      .find(ticket =>
        ticket.id === this.ticketId
      )
  );
 readonly assignedToUserId =
    signal<number | undefined>(undefined);
  readonly status = signal<TicketStatus>('Open');

  readonly priority = signal<TicketPriority>('Medium');

  constructor() {
    const currentTicket = this.ticket();

    if (currentTicket) {
      this.status.set(currentTicket.status);
      this.priority.set(currentTicket.priority);
      this.assignedToUserId.set(currentTicket.assignedToUserId
    );
    }

  }

  saveChanges(): void {
    console.log("Save changes working");
    const currentTicket = this.ticket();

    if (!currentTicket) {
         this.notificationService.error(
      'Ticket not found.'
    );
      return;
    }

    this.ticketStore.updateTicket({
      ...currentTicket,
      status: this.status(),
      priority: this.priority(),
       assignedToUserId:
    this.assignedToUserId()
    });

   this.notificationService.success(
    'Ticket updated successfully.'
  );
  }
}
