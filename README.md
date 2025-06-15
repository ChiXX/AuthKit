# AuthKit

AuthKit is a full‑stack authentication starter kit. The project is split into a
`client` folder containing the front end built with Next.js and a `server` folder
that exposes a REST API using Express. Together they provide registration,
login, account verification and password management features.

## Frontend

The front end is created with **Next.js 14** and **React 18**. Components are
functional and state is handled with the React Context API. Styling is done with
**Tailwind CSS**. Data fetching and authentication calls are performed with
**Axios**. Toast notifications use **react-hot-toast**.

Design-wise the front end follows the file based routing approach of Next.js and
organizes reusable pieces under the `app/components` directory.

### React hooks

- `useState`, `useEffect` and `useContext` for managing state and side effects
- `useRouter` from `next/navigation` for navigation
- A custom hook `useUserRedirect` that checks login status and redirects users
  accordingly

## Backend

The backend is an **Express.js** application written in modern JavaScript. It
uses the **Model‑View‑Controller (MVC)** pattern – models live in
`server/src/models`, controllers in `server/src/controllers` and routes in
`server/src/routes`.

Key technologies include:

- **MongoDB** accessed via **Mongoose**
- **JWT** for authentication tokens
- **bcrypt** for hashing passwords
- **cookie-parser** and **cors** for session handling and CORS support
- **nodemailer** with Handlebars templates for sending verification and password
  reset emails

Environment variables such as database connection strings and email credentials
are loaded with `dotenv`.

## Getting started

- Run `npm install` in both the `client` and `server` directories
- Start the API server with `nodemon server.js` inside `server`
- Start the Next.js dev server with `npm run dev` inside `client`

Visit `http://localhost:3000` to interact with the application.