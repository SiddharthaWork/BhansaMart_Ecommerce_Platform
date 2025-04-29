import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import './index.css';
import { ProtectedLayout, ProtectedLoginPage, routesConfig } from './routes';
import { ReactQueryProvider } from './server-action/providers/QuerryClientProviders.tsx';

const renderRoutes = (routes: any[]) =>
  routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        toastClassName="font-semibold"
        theme="colored"
        className="z-[999999999999999999]"
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<App />}>
              {renderRoutes(routesConfig)}
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/auth-login" element={<ProtectedLoginPage />} />
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
  </StrictMode>
);
