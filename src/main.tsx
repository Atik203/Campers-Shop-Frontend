import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { store } from "./redux/store.ts";

import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { HelmetProvider } from "react-helmet-async";
import router from "./routes/routes.tsx";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        visibleToasts={10}
        richColors={true}
        toastOptions={{
          classNames: {
            success: "toast-success toast-common",
            error: "toast-error toast-common",
            warning: "toast-warning toast-common",
            info: "toast-info toast-common",
          },
        }}
        icons={{
          success: <CheckBadgeIcon className="w-6 h-6" />,
          info: <InformationCircleIcon className="w-6 h-6" />,
          warning: <ExclamationCircleIcon className="w-6 h-6" />,
          error: <ExclamationTriangleIcon className="w-6 h-6" />,
          loading: <MagnifyingGlassCircleIcon className="w-6 h-6" />,
        }}
      />
      <Elements stripe={stripePromise}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </Elements>
    </Provider>
  </React.StrictMode>
);
