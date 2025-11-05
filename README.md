# My Workspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A full-stack monorepo built with Nx featuring a React client with Shadcn UI components and a Express backend with PostgreSQL.

## 🏗️ Architecture

This workspace contains:

- **Client App** (`apps/client`) - React SPA with TanStack Router, Tailwind CSS, Shadcn UI, and Firebase authentication
- **Server App** (`apps/server`) - Express backend with Drizzle ORM, and Firebase authentication
- **UI Library** - Shadcn UI components
- **Database** - PostgreSQL with Drizzle ORM

## 🚀 Tech Stack

### Frontend

- **React** with TypeScript
- **TanStack Router** for routing
- **Tailwind CSS** for styling
- **Shadcn UI** for components
- **Vite** for build tooling

### Backend

- **Node.js** with TypeScript
- **Express** for API
- **Drizzle ORM** for database operations
- **PostgreSQL** database
- **Firebase Authentication** for user management
- **Jest** for testing

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```sh
npm install
```

2. Set up your Firebase project:

   Follow the [Firebase Setup Guide](#-firebase-setup) below to create and configure your Firebase project.

3. Set up your environment variables:

```sh
# Set up client environment variables
cp apps/client/.env.example apps/client/.env

# Set up server environment variables
cp apps/server/.env.example apps/server/.env
```

4. Set up the database:

```sh
# Run database migrations
npm run db:migrate
```

## 🔥 Firebase Setup

This project uses Firebase for authentication. Follow these steps to set up your Firebase project:

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name and follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password** and enable it
3. (Optional) To enable Google Sign-in:
   - Click on **Google** and enable it
   - Configure the OAuth consent screen and authorized domains
   - Note: You'll need to add your domain to the authorized domains list

### 3. Create a Web App

1. In the Firebase console, go to **Project Overview**
2. Click the **Web** icon (`</>`) to create a web app
3. Register your app with a nickname
4. Copy the Firebase configuration object - you'll need the `apiKey` and `authDomain`

### 4. Set up Firebase Admin (Server-side)

1. Go to **Project settings** → **Service accounts**
2. Click **Generate new private key** to download the service account JSON file
3. From this file, you'll need:
   - `project_id`
   - `client_email`
   - `private_key`

### 5. Configure Environment Variables

Create `.env` files in both the client and server directories using their respective `.env.example` templates:

**Client Environment Variables** (`apps/client/.env`):

- `VITE_FIREBASE_API_KEY` - Your Firebase web app API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `VITE_NODE_ENV` - Application environment (development/production)
- `VITE_ENABLE_SIGN_UP_WITH_GOOGLE` - Set to "true" to enable Google sign-in (optional, defaults to "false")
- `VITE_API_URL` - Set to the Backend URL

**Server Environment Variables** (`apps/server/.env`):

- `NODE_ENV` - Server environment (development/production)
- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - PostgreSQL connection string
- `FIREBASE_PROJECT_ID` - Your Firebase project ID
- `FIREBASE_GOOGLE_APPLICATION_CLIENT_EMAIL` - Service account client email
- `FIREBASE_GOOGLE_APPLICATION_PRIVATE_KEY` - Service account private key
- `FRONTEND_URL` - Set to the Frontend URL to Enable Cors

**Important Notes:**

- Keep your `.env` files secure and never commit them to version control
- The `FIREBASE_GOOGLE_APPLICATION_PRIVATE_KEY` should include the full private key with `\n` characters for line breaks
- Replace all placeholder values with your actual Firebase project credentials
- Each app now manages its own environment variables independently

### Google Authentication (Optional Feature)

This template includes optional Google Authentication support. To enable it:

1. **Configure Firebase**: Follow step 3 in the Firebase setup above to enable Google sign-in
2. **Set Environment Variable**: Add `VITE_ENABLE_SIGN_UP_WITH_GOOGLE=true` to your client `.env` file
3. **Test**: The Google sign-in button will appear on login and signup pages when enabled

**When disabled (default):**

- Only email/password authentication is available
- Google sign-in buttons are hidden
- No additional Firebase configuration required

## 🛠️ Development

### Start the development servers

Run both client and server in development mode:

```sh
# Start both client and server simultaneously
npm run dev

# Or start them individually:
npm run dev:client  # React app
npm run dev:server  # API server
```

### Build for production

Create production builds:

```sh
# Build both projects
npm run build

# Build individually:
npm run build:client
npm run build:server
```

### Start production builds

```sh
# Start production server
npm start

# Or start individually:
npm run start:client  # Serve built client
npm run start:server  # Run production server
```

### Database Operations

```sh
# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Testing

```sh
# Run all tests
npm test

# Run tests for specific project
npm run test:client
npm run test:server

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
my-workspace/
├── apps/
│   ├── client/                    # React frontend application
│   │   ├── .env.example          # Client environment variables template
│   │   ├── public/
│   │   │   └── favicon.ico
│   │   ├── src/
│   │   │   ├── api/              # API client functions
│   │   │   ├── assets/           # Static assets
│   │   │   ├── components/       # React components
│   │   │   ├── hooks/            # Custom hooks
│   │   │   │   └── useAuth.tsx   # Authentication hook
│   │   │   ├── routes/           # TanStack Router routes
│   │   │   │   ├── __root.tsx    # Root layout
│   │   │   │   ├── index.tsx     # Home page
│   │   │   ├── types/            # TypeScript type definitions
│   │   │   ├── utils/            # Utility functions
│   │   │   ├── main.tsx          # App entry point
│   │   │   └── routeTree.gen.ts  # Generated route tree
│   │   └──
│   │
│   └── server/                   # Express backend application
│       ├── .env.example         # Server environment variables template
│       ├── src/
│       │   ├── controllers/      # API controllers & services
│       │   ├── db/              # Database configuration
│       │   │   ├── db.ts        # Database connection
│       │   │   ├── migrate.ts   # Migration runner
│       │   │   ├── migrations/  # SQL migration files, generated by Drizzle
│       │   │   └── schema/      # Drizzle ORM schemas
│       │   ├── middlewares/     # Express middlewares
│       │   ├── routes/          # API route definitions
│       │   ├── utils/           # Utility functions
│       │   └── main.ts          # Server entry point
│       └──
│
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI/CD
├── .husky/                      # Git hooks
│   ├── commit-msg              # Commit message validation
│   └── pre-commit              # Pre-commit checks
├── eslint.config.mjs           # ESLint configuration
├── jest.config.ts              # Jest workspace config
├── nx.json                     # Nx workspace configuration
├── package.json                # Root package.json
├── tsconfig.base.json          # Base TypeScript config
├── vitest.workspace.ts         # Vitest workspace config
└── README.md
```

## 🔧 Available Commands

### Project Management

```sh
# View project graph
npx nx graph

# Show available targets for a project
npx nx show project client

# List all projects
npx nx show projects

# Generate new components, services, etc.
npx nx generate
```

### Code Quality

```sh
# Lint all projects
npm run lint

# Lint with auto-fix
npm run lint:fix

# Lint specific projects
npm run lint:client
npm run lint:server
```

## 🪝 Git Hooks & Code Quality

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality standards with Git hooks:

### Pre-commit Hook

Before each commit, the following checks are automatically run:

1. **Lint-staged**: Runs linting and formatting on staged files

   - JavaScript/TypeScript files (`.js`, `.jsx`, `.ts`, `.tsx`):
     - `eslint --fix` - Automatically fixes linting issues
     - `prettier --write` - Formats code consistently
   - Other files (`.json`, `.md`, `.css`, `.scss`):
     - `prettier --write` - Formats files

2. **Tests**: Runs the full test suite to ensure no regressions
   - `npm test` - Executes tests for both client and server

### Commit Message Hook

The project uses [Commitlint](https://commitlint.js.org/) to enforce conventional commit messages:

- Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Examples of valid commit messages:
  ```
  feat: add user authentication
  fix: resolve login button styling issue
  docs: update README with setup instructions
  chore: update dependencies
  ```

### Manual Hook Commands

If you need to run these checks manually:

```sh
# Run lint-staged on all staged files
npx lint-staged

# Run commitlint on a commit message
npx commitlint --edit <commit-message-file>

# Run all pre-commit checks
npm test && npx lint-staged
```

### Setting Up Hooks (Automatic)

Husky hooks are automatically installed when you run `npm install` due to the `prepare` script in `package.json`. If you need to reinstall them:

```sh
# Reinstall Husky hooks
npm run prepare
```

## 📚 Learn More

- [Nx Documentation](https://nx.dev)
- [TanStack Router](https://tanstack.com/router)
- [Shadcn UI](https://ui.shadcn.com/docs/components)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/)
