import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { App } from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
      // refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
          }}
        />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
