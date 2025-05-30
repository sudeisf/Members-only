# Members-only

A secure web application that implements a members-only system with authentication and authorization features.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: Session-based authentication
- **Real-time Communication**: WebSocket
- **API**: RESTful API architecture

## Project Structure

The project follows a client-server architecture:

### Server
- Built with Node.js and Express
- Implements secure authentication and authorization
- Uses session-based authentication for secure communication
- Organized into:
  - `controllers/`: Request handlers
  - `routes/`: API route definitions
  - `services/`: Business logic
  - `middleware/`: Custom middleware functions
  - `config/`: Configuration files
  - `utils/`: Utility functions

### Client
- Frontend application located in the `client/client-side` directory
- Provides user interface for the members-only system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Members-only
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client/client-side
npm install
```

4. Set up PostgreSQL database:
```bash
# Create database
createdb members_only

# Run migrations (if using a migration tool)
npm run migrate
```

### Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client:
```bash
cd client/client-side
npm start
```

## Features

### Authentication & User Management
- Session-based user authentication
- Secure user registration and login
- User profile management

### Content Management
- Create and manage posts
- View and interact with other users' posts
- Rich text editing capabilities

### Club System
- Join and create clubs
- Club membership management
- Club-specific content and discussions

### Real-time Notifications
- WebSocket-based notification system
- Real-time updates for:
  - New club invitations
  - Post interactions
  - Club activities
  - System notifications

### Security Features
- Session-based authentication
- Protected API routes
- Secure password handling
- Middleware for authorization checks

## Database Schema

The application uses PostgreSQL with the following main tables:
- Users
- Posts
- Clubs
- Club_Members
- Notifications
- Sessions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
