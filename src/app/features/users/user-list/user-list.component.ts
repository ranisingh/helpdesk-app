import { Component, inject } from '@angular/core';
import {
  UserStore
} from '../data-access/user.store';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
 readonly userStore =
    inject(UserStore);
}


