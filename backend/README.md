# QuizRush Backend

A real-time quiz game backend built with Node.js, Express, MongoDB, and Socket.IO.

## Features

- User authentication with JWT
- Quiz creation and management
- Real-time game sessions with PIN-based joining
- Live scoring and leaderboards
- Socket.IO for real-time updates

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Real-time**: Socket.IO
- **Language**: TypeScript
- **Authentication**: JWT

## Prerequisites

- Node.js 16+
- MongoDB 4.0+
- npm or pnpm

## Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizrush
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile

### Quizzes
- `POST /quizzes` - Create a new quiz
- `GET /quizzes` - Get all public quizzes
- `GET /quizzes/:id` - Get quiz details
- `GET /quizzes/my/quizzes` - Get my quizzes
- `PUT /quizzes/:id` - Update quiz
- `DELETE /quizzes/:id` - Delete quiz

### Games
- `POST /games` - Create game session
- `POST /games/join` - Join game by PIN
- `GET /games/:id` - Get game details
- `POST /games/:id/answer` - Submit answer
- `POST /games/:id/end` - End game
- `GET /games/:id/results` - Get game results

### Leaderboard
- `GET /leaderboard` - Get global leaderboard
- `GET /leaderboard/user/:userId` - Get user ranking

### Users
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile

## Socket.IO Events

### Client → Server
- `join-game` - Join a game room
- `next-question` - Send next question
- `answer-submitted` - Notify answer submission
- `get-scores` - Request live scores
- `leave-game` - Leave game room

### Server → Client
- `player-joined` - Player joined event
- `question-sent` - Question broadcast
- `player-answered` - Player answered event
- `scores-updated` - Live scores update
- `player-left` - Player left event
- `error` - Error event

## Database Schema

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  totalScore: number
  gamesPlayed: number
  correctAnswers: number
  createdAt: Date
  updatedAt: Date
}
```

### Quiz
```typescript
{
  title: string
  description: string
  creatorId: ObjectId
  questions: Question[]
  category: string
  difficulty: "easy" | "medium" | "hard"
  isPublic: boolean
  totalPoints: number
  timeLimit: number
}
```

### GameSession
```typescript
{
  pin: string (unique)
  quizId: ObjectId
  hostId: ObjectId
  participants: ObjectId[]
  currentQuestionIndex: number
  isActive: boolean
  answers: PlayerAnswer[]
  startedAt: Date
  endedAt: Date
}
```

## Error Handling

All errors return a JSON response with an error message:
```json
{
  "error": "Error description"
}
```

## Future Enhancements

- WebSocket reconnection handling
- Game categories and tags
- Achievements and badges
- Social features (friends, challenges)
- Analytics and statistics
- Mobile app support

## License

MIT
