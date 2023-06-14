import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./contexts/notificationContext";
import { UserContextProvider } from "./contexts/userContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </QueryClientProvider>
  </UserContextProvider>
);
