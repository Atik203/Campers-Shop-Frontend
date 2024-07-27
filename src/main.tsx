import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        visibleToasts={10}
        richColors={true}
        toastOptions={{
          style: {
            background: "mediumseagreen",
            color: "white",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "6px",
          },
        }}
      />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
