# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# MovieNest Client

This is the frontend client for the **MovieNest** movie ticket booking application.  
Built with React and Vite, it provides a fast, modern, and responsive user experience for browsing movies, booking tickets, and managing your bookings.

---

## Features

- Browse now playing movies (powered by TMDB API)
- View movie details and showtimes
- Select seats and book tickets
- Secure authentication (Clerk)
- Payment integration (Stripe)
- View and manage your bookings
- Responsive design for mobile and desktop

---

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Clerk](https://clerk.com/) (Authentication)
- [Stripe](https://stripe.com/) (Payments)
- [Axios](https://axios-http.com/) (API requests)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [React Router](https://reactrouter.com/) (Routing)
- [React Icons](https://react-icons.github.io/react-icons/) (Icons)

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Environment Variables:**
   - Create a `.env` file in the `client` directory with your public keys (e.g., Clerk publishable key, Stripe publishable key, API base URL).
   - **Do not include any secret keys in the client.**

---

## Project Structure

```
src/
  ├── assets/         # Images and static assets
  ├── components/     # Reusable React components
  ├── pages/          # Page components (Home, Movies, Bookings, etc.)
  ├── services/       # API and utility functions
  ├── App.jsx         # Main app component
  └── main.jsx        # Entry point
```

---

## Customization

- Update the theme and branding in `src/assets` and Tailwind config.
- Modify routes and navigation in `src/App.jsx` and `src/components/Nav.jsx`.

---

## Admin

-temperorly given admin access for all user 

