import { useEffect, useRef, useState } from "react";
import "./PuertaIntro.css";

/**
 * Intro animada: puerta -> zoom + apertura -> destello blanco/celeste -> tu contenido
 *
 * Se usa envolviendo tu app (portada + invitación) tal como ya la tenés:
 *
 *   <PuertaIntro puerta={puerta} precargar={[hero]}>
 *     <App />
 *   </PuertaIntro>
 *
 * Props:
 *  - puerta:    imagen de la puerta
 *  - children:  lo que aparece después del destello (tu portada / invitación)
 *  - precargar: (opcional) lista de imágenes de tu portada para cargarlas de antemano
 */

// Tiempos en milisegundos (contados desde que tocan la puerta).
// Si cambiás las duraciones en el CSS, ajustá estos también.
// Las puertas terminan de abrirse a los 5,6 s (retardo 1,2 s + 4,4 s de apertura)
const T_DESTELLO = 5400; // empieza el destello suave, cuando la puerta ya casi está abierta
const T_CONTENIDO = 6400; // con la pantalla ya blanca (0,9 s después), aparece tu contenido

export default function PuertaIntro({
  puerta,
  children,
  precargar = [],
  musica,          // ruta de la canción (se reproduce en bucle al tocar la puerta)
  volumen = 0.8,   // 0 a 1
}) {
  // cerrada -> abriendo -> destello -> listo (destello apagándose) -> fin
  const [fase, setFase] = useState("cerrada");
  const timers = useRef([]);
  const audio = useRef(null);

  // Precarga de imágenes para que no se trabe la animación ni parpadee tu portada
  useEffect(() => {
    [puerta, ...precargar].filter(Boolean).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current.forEach(clearInterval);
      if (audio.current) audio.current.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puerta]);

  // La música arranca con el toque del usuario (los navegadores no permiten
  // reproducir audio solos), suena en bucle y sube de volumen de a poco.
  const iniciarMusica = () => {
    if (!musica) return;
    const a = new Audio(musica);
    a.loop = true;
    a.volume = 0;
    audio.current = a;
    a.play().catch(() => {});
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(v + 0.04, volumen);
      a.volume = v;
      if (v >= volumen) clearInterval(id);
    }, 100);
    timers.current.push(id);
  };

  const abrir = () => {
    if (fase !== "cerrada") return;
    iniciarMusica();
    setFase("abriendo");
    timers.current.push(setTimeout(() => setFase("destello"), T_DESTELLO));
    timers.current.push(setTimeout(() => setFase("listo"), T_CONTENIDO));
  };

  // Ya pasó la puerta: se muestra tu contenido. Mientras dura "listo",
  // un destello blanco se va apagando por encima y revela tu portada.
  if (fase === "listo" || fase === "fin") {
    return (
      <>
        {children ?? (
          <div className="pi-cover pi-placeholder">Aquí va tu portada</div>
        )}
        {fase === "listo" && (
          <div
            className="pi-flash-salida"
            onAnimationEnd={() => setFase("fin")}
          />
        )}
      </>
    );
  }

  return (
    <div
      className="pi-root"
      style={{ "--img": `url(${puerta})` }}
      onClick={abrir}
    >
      {/* Fondo: la misma imagen difuminada, para rellenar los costados en pantallas anchas */}
      <div className="pi-bg" />

      <div className={`pi-stage ${fase !== "cerrada" ? "pi-go" : ""}`}>
        <div className="pi-cam">
          <div className="pi-layer" />
          <div className="pi-glow" />
          <div className="pi-leaf pi-l" />
          <div className="pi-leaf pi-r" />
        </div>

        {/* Texto titilante en el medio de la puerta */}
        <div className="pi-hint">
          <span>Toca la puerta</span>
          <span>para comenzar</span>
        </div>
      </div>

      {/* Destello que tapa la pantalla */}
      <div className={`pi-flash ${fase === "destello" ? "pi-on" : ""}`} />
    </div>
  );
}
