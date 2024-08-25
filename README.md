# Email Sequence Generator Boilerplate

## Project Overview

This web application allows users to create hyper-customized email sequences on various topics using AI. The core functionality includes:

1. Collecting user inputs about a specific topic (e.g., dog training, gardening tips, business growth)
2. Sending these inputs along with a custom prompt to OpenAI
3. Generating a structured series of emails (e.g., 52 weekly emails) based on the AI response
4. Storing the generated email sequence in a database
5. Scheduling and sending emails using Brevo (formerly Sendinblue) API

## Project Structure
email-sequence-boilerplate/
├── backend/
│ ├── config/
│ │ ├── authConfig.js
│ │ ├── brevoConfig.js
│ │ ├── databaseConfig.js
│ │ ├── emailSequenceConfig.js
│ │ ├── openaiConfig.js
│ │ ├── routesConfig.js
│ │ └── userConfig.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── emailSequenceController.js
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── emailSequence.js
│ │ └── user.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── emailSequenceRoutes.js
│ ├── services/
│ │ ├── authService.js
│ │ ├── brevoService.js
│ │ └── openaiService.js
│ ├── src/
│ │ └── server.js
│ ├── .env
│ ├── .env.example
│ └── package.json
└── frontend/ (not yet implemented)


## Prerequisites

- Node.js (v14 or later)
- MongoDB
- OpenAI API key
- Brevo API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/email-sequence-boilerplate.git
   cd email-sequence-boilerplate
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```

2. Edit `.env` and fill in your actual configuration values:
   ```
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   BREVO_API_KEY=your_brevo_api_key
   BREVO_SENDER_NAME=Your Name
   BREVO_SENDER_EMAIL=your-email@example.com
   ```

## Running the Application

1. Start the backend server:
   ```
   npm run dev
   ```

   The server will start on `http://localhost:5000` by default.

## API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login and receive a JWT token
- **POST /api/email-sequences/create**: Create a new email sequence (requires authentication)

## Configuration

The application uses various configuration files located in the `backend/config` directory. You can modify these files to customize the behavior of different components:

- `authConfig.js`: JWT settings
- `brevoConfig.js`: Brevo email service settings
- `databaseConfig.js`: MongoDB connection options
- `emailSequenceConfig.js`: Email sequence generation settings
- `openaiConfig.js`: OpenAI API settings
- `routesConfig.js`: API route prefixes
- `userConfig.js`: User model additional fields

## Testing

(Add information about running tests once implemented)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT model
- Brevo (formerly Sendinblue) for email services