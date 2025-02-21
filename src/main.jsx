import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Routes/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ThemeProvider from './Provider/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={Router} />
      </DndProvider>
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
