# Helpdesk & Ticket Management System

A modern **Helpdesk & Ticket Management System** built with **Angular 18** to demonstrate enterprise-style Angular development, scalable application architecture, reactive state management, and reusable UI patterns.

The application allows users to create, manage, assign, update, filter, and track support tickets through their lifecycle.

> **Current version:** Frontend application using browser `localStorage` for persistence.  
> **Planned:** ASP.NET Core Web API, Entity Framework Core, SQL Server, authentication, and role-based authorization.

---

## Features

### Dashboard

The dashboard provides a real-time overview of ticket activity using Angular Signals and computed state.

- Total tickets
- Open tickets
- In-progress tickets
- Resolved tickets
- High-priority tickets
- My tickets
- Assigned tickets
- Unassigned tickets

Dashboard values automatically update when the underlying ticket state changes.

### Ticket Management

Users can:

- Create new tickets
- View ticket details
- Update existing tickets
- Delete tickets
- Change ticket status
- Change ticket priority
- Assign tickets to users
- Leave tickets unassigned
- Search tickets
- Filter tickets by status
- Filter tickets by priority

### User Management

The application maintains users with:

- Name
- Email
- Role
- Active/inactive status

Supported roles currently include:

- Admin
- Support Agent
- Employee

Tickets reference users using `assignedToUserId` rather than storing the user's name directly.

### Notifications

A reusable notification service provides application-wide feedback using Angular Material Snackbar.

Examples:

- Ticket created successfully
- Ticket updated successfully
- Ticket deleted successfully
- Validation/error notifications

### Confirmation Dialog

Ticket deletion uses a reusable Angular Material confirmation dialog.

The dialog uses RxJS `afterClosed()` to react to the user's confirmation.

---

## Angular Concepts Demonstrated

This project demonstrates several modern Angular development concepts:

- Angular 18
- TypeScript
- Standalone Components
- Angular Signals
- `signal()`
- `computed()`
- Readonly Signals
- RxJS
- Reactive Forms
- FormBuilder
- Angular Validators
- Angular Material
- Angular Router
- Lazy Loading
- Route Parameters
- Dependency Injection
- `inject()`
- Modern Angular template control flow
- `@if`
- `@for`
- `@empty`
- `track`
- Reusable services
- Feature-based architecture
- Derived state management
- SCSS
- Browser localStorage persistence

---

## Architecture

The project follows a feature-based Angular architecture.

```text
src/app/
│
├── core/
│   └── services/
│       └── notification.service.ts
│
├── layout/
│   ├── header/
│   ├── sidebar/
│   └── main-layout/
│
├── features/
│   │
│   ├── dashboard/
│   │
│   ├── tickets/
│   │   ├── data-access/
│   │   │   └── ticket.store.ts
│   │   ├── models/
│   │   │   └── ticket.model.ts
│   │   └── pages/
│   │       ├── ticket-list/
│   │       ├── create-ticket/
│   │       └── ticket-details/
│   │
│   └── users/
│       ├── data-access/
│       │   └── user.store.ts
│       ├── models/
│       │   └── user.model.ts
│       └── pages/
│           └── user-list/
│
├── shared/
│   └── components/
│       └── confirm-dialog/
│
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

The structure separates:

**Core** — Application-wide services and cross-cutting functionality.

**Features** — Business functionality such as tickets, users, and dashboard.

**Shared** — Reusable UI components.

**Layout** — Main application shell, header, and sidebar.

---

## State Management with Angular Signals

Angular Signals are used as the primary frontend state-management mechanism.

Example:

```typescript
private readonly _tickets =
  signal<Ticket[]>(this.loadTickets());

readonly tickets =
  this._tickets.asReadonly();
```

The writable state remains private while components receive a read-only representation.

Derived state is calculated using `computed()`.

```typescript
readonly openTickets = computed(() =>
  this._tickets().filter(
    ticket => ticket.status === 'Open'
  )
);
```

This approach avoids maintaining duplicate state.

When `_tickets` changes, dependent computed values and UI elements update automatically.

---

## Ticket Filtering

Search and filter criteria are also represented using Signals.

```typescript
readonly searchTerm = signal('');
readonly statusFilter = signal('All');
readonly priorityFilter = signal('All');
```

Filtered tickets are derived using `computed()`.

This allows the UI to react automatically when either the ticket collection or filter criteria change.

---

## Ticket and User Relationship

Tickets store the assigned user's ID:

```typescript
assignedToUserId?: number;
```

Instead of storing:

```typescript
assignedTo: string;
```

The corresponding user is resolved through `UserStore`.

```typescript
userStore.getUserName(
  ticket.assignedToUserId
);
```

This design prepares the frontend model for a future backend relationship such as:

```text
User
 │
 │ 1
 │
 └────────────── *
              Ticket
```

where `assignedToUserId` can eventually become a database foreign key.

---

## Forms and Validation

Ticket creation uses Angular Reactive Forms.

Validation includes:

- Required fields
- Minimum title length
- Maximum title length
- Minimum description length
- Required category
- Required priority

Example:

```typescript
title: [
  '',
  [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)
  ]
]
```

Validation errors are displayed dynamically in the UI.

---

## Routing

The application uses Angular Router with lazy-loaded standalone components.

Main routes include:

```text
/dashboard
/tickets
/tickets/new
/tickets/:id
/users
```

Example:

```typescript
{
  path: 'tickets/:id',
  loadComponent: () =>
    import('./features/tickets/pages/ticket-details/ticket-details.component')
      .then(m => m.TicketDetailsComponent)
}
```

---

## Data Persistence

The current version uses browser `localStorage`.

```text
Angular Components
        ↓
Angular Stores
        ↓
Signals
        ↓
localStorage
```

`localStorage` is intentionally being used as a temporary persistence mechanism so frontend functionality can be developed independently.

No sensitive information should be stored in browser localStorage.

---

## Planned Backend Architecture

The project is designed so the temporary persistence layer can later be replaced with an ASP.NET Core backend.

Planned architecture:

```text
Angular 18
    ↓
HttpClient
    ↓
RxJS
    ↓
REST API
    ↓
ASP.NET Core Web API
    ↓
Application / Service Layer
    ↓
Entity Framework Core
    ↓
SQL Server
```

Planned backend enhancements include:

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- DTOs
- Repository/service patterns where appropriate
- Centralized exception handling
- API logging
- JWT authentication
- Role-based authorization

---

## Planned Angular Enhancements

Future frontend enhancements include:

- Authentication
- Login/logout
- Route Guards
- HTTP Interceptors
- JWT handling
- Role-based UI authorization
- API integration using `HttpClient`
- Advanced RxJS usage
- Loading indicators
- Global API error handling
- User create/edit functionality
- Ticket history
- Comments
- Pagination
- Sorting
- Reporting
- Unit tests

---

## Technology Stack

| Technology | Usage |
|---|---|
| Angular 18 | Frontend framework |
| TypeScript | Application development |
| Angular Signals | Reactive state management |
| RxJS | Asynchronous/reactive operations |
| Angular Material | UI components and dialogs |
| Reactive Forms | Forms and validation |
| Angular Router | Navigation and lazy loading |
| SCSS | Application styling |
| localStorage | Temporary persistence |
| ASP.NET Core | Planned backend |
| EF Core | Planned ORM |
| SQL Server | Planned database |

---

## Getting Started

### Prerequisites

Install:

- Node.js
- npm
- Angular CLI 18

Check your versions:

```bash
node --version
npm --version
ng version
```

### Clone the Repository

```bash
git clone <your-repository-url>
cd helpdesk-app
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

The application automatically reloads when source files change.

---

## Build

Create a production build using:

```bash
ng build
```

Build artifacts are generated in the `dist/` directory.

---

## Learning Objectives

I built this project to strengthen my practical knowledge of modern Angular development and apply concepts in an application closer to a real enterprise workflow.

The main areas of focus are:

- Scalable Angular architecture
- Standalone Components
- Signals and computed state
- RxJS
- Reactive Forms
- Component communication
- Dependency Injection
- Routing and lazy loading
- Angular Material
- Reusable components and services
- State/data-access separation
- REST API-ready frontend architecture

The project will continue evolving toward a complete Angular + ASP.NET Core full-stack application.

---

## Author

**Rani Kumari**

Frontend / Full-Stack Developer

Core technologies:

`Angular` • `TypeScript` • `RxJS` • `.NET` • `ASP.NET Core` • `EF Core` • `SQL Server`

---

## Project Status

🚧 **Active Development**

The Angular frontend is currently under development. Additional features, backend integration, authentication, testing, and deployment will be added incrementally.
