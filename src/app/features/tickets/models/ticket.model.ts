export type TicketStatus =
  | 'Open'
  | 'In Progress'
  | 'Resolved'
  | 'Closed';

export type TicketPriority =
  | 'Low'
  | 'Medium'
  | 'High'
  | 'Critical';

export interface Ticket {
  id: number;

  title: string;
  description: string;
  category: string;

  status: TicketStatus;
  priority: TicketPriority;

  createdBy: string;

  assignedToUserId?: number;

  createdAt: Date;
}