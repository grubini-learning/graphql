import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const el = document.getElementById("root");
const root = createRoot(el!);
const client = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
