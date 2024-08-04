import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AntdConfigProvider } from "./app";
import { Main } from "./pages";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <AntdConfigProvider>
      <Main />
    </AntdConfigProvider>
  </StrictMode>,
);
