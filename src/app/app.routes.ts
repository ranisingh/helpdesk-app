import { Routes } from '@angular/router';

import { MainLayoutComponent }
  from './layout/main-layout/main-layout.component';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',

        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      {
  path: 'tickets',

  loadComponent: () =>
    import(
      './features/tickets/ticket-list/ticket-list.component'
    )
    .then(m => m.TicketListComponent)
},

{
  path: 'tickets/new',

  loadComponent: () =>
    import(
      './features/tickets/create-ticket/create-ticket.component'
    )
    .then(m => m.CreateTicketComponent)
},

{
  path: 'tickets/:id',
  loadComponent: () =>
    import(
      './features/tickets/ticket-details/ticket-details.component'
    ).then(m => m.TicketDetailsComponent)
},
{
  path: 'users',

  loadComponent: () =>
    import(
      './features/users/user-list/user-list.component'
    )
    .then(m => m.UserListComponent)
}



    ]
  }

];