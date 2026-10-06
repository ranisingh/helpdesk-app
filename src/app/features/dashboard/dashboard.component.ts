import { Component, inject } from '@angular/core';
import {TicketStore} from '../tickets/data-access/ticket.store';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly ticketStore = inject(TicketStore);
  

}
