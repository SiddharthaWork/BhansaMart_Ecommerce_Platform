import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { routesConfig } from "./routes/routesConfig.tsx";
import { store } from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
import { ContextProvider } from "./context/AppContext.tsx";

const renderRoutes = (routes: any[]) =>
  routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              {renderRoutes(routesConfig)}
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        toastClassName="font-semibold"
        theme="colored"
      />
    </Provider>
  </StrictMode>
);
