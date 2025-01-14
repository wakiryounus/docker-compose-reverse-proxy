import "./index.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const root = createRoot(document.getElementById("root") as HTMLElement);
// Create a client
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
