export type UserRole =
  | 'Admin'
  | 'Support Agent'
  | 'Employee';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}