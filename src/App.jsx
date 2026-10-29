import { useEffect, useRef, useState } from "react";
import "./App.css";
import Invitacion from "./components/Invitacion";

function App() {
  const [mostrarInvitacion, setMostrarInvitacion] = useState(false);
  const invitacionRef = useRef(null);

  useEffect(() => {
    if (mostrarInvitacion && invitacionRef.current) {
      invitacionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [mostrarInvitacion]);

  return (
    <>
      {!mostrarInvitacion && (
        <main className="portada">
          <div className="fondo" />

          <div className="brillo brillo-1" aria-hidden="true">
            ✦
          </div>

          <section className="contenido">
            <div className="estrella" aria-hidden="true">
              ✧
            </div>

            <p className="subtitulo">UNA NOCHE DE MAGIA</p>
            <h1 className="nombre-maia">Maia</h1>
            <p className="quince"> Mis quince años </p>
            <p className="fecha">28 · 11 · 2026</p>

            <button
              className="boton-entrada"
              onClick={() => setMostrarInvitacion(true)}
            >
              DESCUBRÍ LA INVITACIÓN 
            </button>
          </section>

          <div className="borde" />
        </main>
      )}

      {mostrarInvitacion && (
        <div ref={invitacionRef}>
          <Invitacion />
        </div>
      )}
    </>
  );
}

export default App;
