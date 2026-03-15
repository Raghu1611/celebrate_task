# React Photo Gallery

A responsive and modern photo gallery web application built using React, Vite, and Tailwind CSS. This project serves as an assignment demonstrating best practices in React functional components, hooks, state management, and API integration.

## Features

- **Dynamic Data Fetching**: Retrieves a set of 30 photos from the [Picsum API] upon initial page load.
- **Custom React Hooks**: Implements `useFetchPhotos` to cleanly separate data-fetching logic from UI components.
- **Responsive Grid Layout**: Utilizes Tailwind CSS to create a fully responsive interface:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- **Favorites Management**: Users can toggle favorite photos using a heart icon. Favorited items are managed smoothly via `useReducer` and persist across page reloads via `localStorage`.
- **Real-Time Client-Side Search**: A search bar filters photos by the author's name in real-time. This feature is optimized using `useMemo` for derived state and `useCallback` to prevent unnecessary re-renders.
- **Sleek UI Design**: Complete with loading spinners, error states, and empty states. No external UI frameworks (like MUI or Bootstrap) were used, relying solely on Tailwind CSS.

## Project Structure

```text
c:\Assignment\
├── src/
│   ├── components/
│   │   └── PhotoCard.jsx       # Component for rendering individual photos with the favorite toggle
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook for fetching API data and handling loading/error states
│   ├── App.jsx                 # Main application component & favoritesReducer logic
│   ├── main.jsx                # Entry point for React
│   └── index.css               # Tailwind CSS imports and custom base styles
├── index.html                  # HTML template
├── package.json                # Project dependencies and npm scripts
├── tailwind.config.js          # Tailwind CSS configuration file
├── postcss.config.js           # PostCSS configuration for processing Tailwind
├── vite.config.js              # Vite configuration file
└── README.md                   # Project documentation
```

## Tech Stack

- **React** (Functional Components, Hooks)
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **PostCSS** (CSS Processor)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd "c:\New folder (4)"
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the local server address provided in your terminal (usually `http://localhost:5173`).
