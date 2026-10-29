import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PuertaIntro from "./PuertaIntro.jsx";
import puerta from "./assets/puerta.png";
import hero from "./assets/hero.png";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PuertaIntro puerta={puerta} precargar={[hero]}>
      <App />
    </PuertaIntro>
  </StrictMode>
);
