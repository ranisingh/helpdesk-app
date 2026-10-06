import {
  Injectable,
  signal
} from '@angular/core';

import {
  User
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private readonly storageKey =
    'helpdesk_users';

  private readonly _users =
    signal<User[]>(this.loadUsers());

  readonly users =
    this._users.asReadonly();



// GET USER BY ID
  // -------------------------

  getUserById(id?: number): User | undefined {

    if (id === undefined) {
      return undefined;
    }

    return this._users().find(
      user => user.id === id
    );
  }


  // -------------------------
  // GET USER NAME
  // -------------------------

  getUserName(id?: number): string {

    if (id === undefined) {
      return 'Unassigned';
    }

    return this.getUserById(id)?.name
      ?? 'Unknown User';
  }



  private loadUsers(): User[] {

    const savedUsers =
      localStorage.getItem(this.storageKey);

    if (savedUsers) {
      return JSON.parse(savedUsers);
    }


    

    const initialUsers: User[] = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@helpdesk.com',
        role: 'Support Agent',
        active: true
      },
      {
        id: 2,
        name: 'Alex Johnson',
        email: 'alex@helpdesk.com',
        role: 'Support Agent',
        active: true
      },
      {
        id: 3,
        name: 'Rani Kumari',
        email: 'rani@helpdesk.com',
        role: 'Admin',
        active: true
      }
    ];

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(initialUsers)
    );

    return initialUsers;
  }
}