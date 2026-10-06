import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  TicketStore
} from '../data-access/ticket.store';

import {
  TicketPriority
} from '../models/ticket.model';
import {
  NotificationService
} from '../../../core/services/notification.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent {

  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  private readonly ticketStore =
    inject(TicketStore);


  readonly ticketForm =
    this.fb.nonNullable.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],

      category: [
        '',
        Validators.required
      ],

      priority: [
        'Medium',
        Validators.required
      ]

    });


  submit(): void {
     //console.log('Submit clicked');

    if (this.ticketForm.invalid) {

      this.ticketForm.markAllAsTouched();
       this.notificationService.error(
      'Please complete all required fields.'
    );
      return;
    }


    const formValue =
      this.ticketForm.getRawValue();


    this.ticketStore.addTicket({

      id: Date.now(),

      title: formValue.title,

      description: formValue.description,

      category: formValue.category,

      priority:
        formValue.priority as TicketPriority,

      status: 'Open',

      createdBy: 'Rani',

      createdAt: new Date()

    });

  //console.log('Ticket created');
  this.notificationService.success(
      'Ticket created successfully.'
    );
  
    this.router.navigate(['/tickets']);
  }


  cancel(): void {

    this.router.navigate(['/tickets']);

  }

}