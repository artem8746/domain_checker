## Twilight
- [Presentation Video](https://www.loom.com/share/fb45a6ea75274d92b3c6f009e8fb29a1?sid=c70523f1-6223-4267-9f4a-7a31b9ba9c5e)
- [Demo Frontend](https://domain-checker-frontend.vercel.app/)
- [Demo Backend](https://domain-checker-6694.onrender.com)

### Used technologies

#### Backend
- Express
- TypeScript
- Axios

#### Frontend
- React
- TypeScript
- Axios
- MUI

## How to use

1. Clone the repository:

   ```bash
   git clone https://github.com/artem8746/domain_checker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project-directory
   ```

3. Make sure you have version 20 of the node:

   ```bash
   nvm use 20
   ```

4. Install dependencies for both the frontend and backend workspaces:

   ```bash
   npm install -w frontend
   npm install -w backend
   ```

5. Run the following commands to copy the .env.sample files to .env in the frontend and backend workspaces:

   ```bash
   npm run init -w backend
   npm run init -w frontend
   ```

6. Insert your API key into the .env file in the backend workspace:

7. Start the development server for the backend:

   ```bash
   npm run dev -w backend
   ```

8. Start the development server for the frontend:

   ```bash
   npm run dev -w frontend
   ```

9. Preview command open your browser on http://localhost:5173.

## Available Scripts

### Frontend workspace

- npm run dev -w frontend - runs your app in dev mode
- npm start -w frontend - runs your app in dev mode
- npm run build -w frontend - builds the app for production
- npm run lint -w frontend - runs linter
- npm run preview -w frontend - preview a production build

### Backend workspace

- npm run dev -w backend - runs your app in dev mode
- npm run build - builds the app for production
- npm run lint -w frontend - runs linter
