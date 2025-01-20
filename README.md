# Re Custom Metrics Dashboard

## Overview

The **Re Custom  Metrics Dashboard** is a web application that allows administrators to manage users, view their activity, and perform various actions such as adding, updating, or deleting users. The application also provides a chart displaying user activity metrics like logins and downloads.

## Features

- **User Management**: Add, update, and view user details.
- **Activity Metrics**: View user login and download counts.
- **Interactive Table**: List of users with editable roles and activity data.
- **Modal Forms**: Forms for adding and updating user details.
- **Responsive Design**: Works on desktop and mobile devices.

## Technologies Used

### Frontend:
- **Next** with **TypeScript**
- **UI Framework**: Tailwind CSS (or your preferred UI framework)
- **Charting Library**: Chart.js (for metrics visualization)

### Backend:
- **NestJS** (for API)
- **PostgreSQL** (for the database)
- **Sequelize** (ORM for interacting with the database)

### Backend (PostgreSQL + API):
1. **Endpoints:**
   - **Users:**
     - GET: Fetch all users.
     - POST: Add a new user.
     - PUT: Edit a user.
     - DELETE: Delete a user.
   - **Activity Logs:**
     - GET: Fetch activity logs for a user.
   - **PDF Generation:**
     - GET: Generate and return a downloadable PDF for the user.

2. **Pre-seeded Data:**
   - The database is populated with 5–10 users and activity logs.

### PDF Generation:
- The PDF content includes:
  - User's name, email, and role.
  - Total logins and downloads.
  - A simple table summarizing recent activity.

### Testing:
- Unit tests are written for React components (e.g., adding/editing a user).


## Installation

### Prerequisites

- Node.js
- npm

### Steps

1. Backend
 Running the Application
-   **Development Mode**:
    ```bash
    npm run start:dev
    ```
-   **Production Mode**:
    ```bash
    npm run start:prod
    ```
2. Frontend
 Running the Application   
-   **Development Mode**:
    ```bash
    npm run dev
    ```
-   **Build for Production**:
    ```bash
    npm run build
    ```
-   **Preview Production Build**:
    ```bash
    npm run preview
    ```
-   **Testing**:
    ```bash
    npm run test
    ```

# Usage
### Login: Use the login form to authenticate and access the dashboard.
### Add User: Click the "Add User" button to open a form for adding a new user.
### Edit User: Click the "Edit" button in the user table to modify user details.
### Delete User: Click the "Delete" button to remove a user from the list.
### View Activity: The dashboard displays login and download counts for each user.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
