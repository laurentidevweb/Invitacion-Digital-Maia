import "../App.css";
import "./Invitacion.css";
import { useEffect, useState } from "react";

/* ====== DATOS EDITABLES ====== */
const WHATSAPP_NUMBER = "5491131495349";
const MAPS_URL = "https://maps.app.goo.gl/fFoJm9Km9voyaU2e7";
const FECHA_FIESTA = "2026-11-28T21:00:00-03:00";
const ALIAS = "maia.maidana27";

const MSJ_CONFIRMAR = "¡Hola! Confirmo mi asistencia a los quince de Maia.";
const MSJ_MUSICA =
  "¡Hola Maia! Estas canciones no pueden faltar en tu fiesta de quince: ";
/* ============================= */

/* Íconos de línea */
const ICONOS = {
  star: (
    <polygon points="12 2.5 14.9 8.8 21.8 9.5 16.6 14.2 18.1 21 12 17.5 5.9 21 7.4 14.2 2.2 9.5 9.1 8.8" />
  ),
  sparkles: (
    <>
      <path d="M11 3c.7 5.2 3 7.5 8.5 8.5-5.5 1-7.8 3.3-8.5 8.5-.7-5.2-3-7.5-8.5-8.5C8 10.5 10.3 8.2 11 3z" />
      <path d="M19 2v4M17 4h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  shirt: (
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  flecha: <path d="M7 17 17 7M8 7h9v9" />,
};

function Icono({ nombre, className = "" }) {
  return (
    <svg
      className={`icono ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONOS[nombre]}
    </svg>
  );
}

/* Mariposas decorativas: usan /public/mariposa.png */
function Mariposas() {
  const ocultar = (e) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <>
      <img
        className="mariposa mariposa-a"
        src="/mariposa.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={ocultar}
      />
      <img
        className="mariposa mariposa-b"
        src="/mariposa.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={ocultar}
      />
    </>
  );
}

/* Franja que separa una sección de otra */
function Separador() {
  /* En celular el texto no entra en una sola línea, así que la franja
     se desliza de costado (por eso el contenido está dos veces). */
  const contenido = (
    <>
      <span>MIS QUINCE AÑOS</span>
      <Icono nombre="star" />
      <span>UNA NOCHE PARA VIVIRLA A PLENO</span>
      <Icono nombre="star" />
      <span>28 NOVIEMBRE 2026</span>
      <Icono nombre="star" />
    </>
  );

  return (
    <div className="separador-seccion" aria-hidden="true">
      <div className="separador-pista">
        <div className="separador-grupo">{contenido}</div>
        <div className="separador-grupo separador-copia">{contenido}</div>
      </div>
    </div>
  );
}

/* Separador delicado: línea, mariposa azul y línea */
function SeparadorMariposa() {
  return (
    <div className="separador-mariposa" aria-hidden="true">
      <span className="linea-fina" />
      <img
        className="mariposa-sep"
        src="/mariposa.png"
        alt=""
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="linea-fina" />
    </div>
  );
}

function Invitacion() {
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  const [copiado, setCopiado] = useState(false);

  /* Cuenta regresiva */
  useEffect(() => {
    function actualizarCuentaRegresiva() {
      const restante = Math.max(
        0,
        new Date(FECHA_FIESTA).getTime() - Date.now(),
      );

      setTiempoRestante({
        dias: Math.floor(restante / 86400000),
        horas: Math.floor((restante / 3600000) % 24),
        minutos: Math.floor((restante / 60000) % 60),
        segundos: Math.floor((restante / 1000) % 60),
      });
    }

    actualizarCuentaRegresiva();
    const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
    return () => clearInterval(intervalo);
  }, []);

  /* Cada sección aparece suavemente al llegar a ella */
  useEffect(() => {
    const secciones = document.querySelectorAll(".seccion-invitacion");

    if (!("IntersectionObserver" in window)) {
      secciones.forEach((s) => s.classList.add("en-vista"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("en-vista");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    secciones.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, []);

  function abrirWhatsApp(mensaje) {
    if (WHATSAPP_NUMBER.includes("X")) {
      alert("Falta configurar el número de WhatsApp de la familia.");
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function copiarAlias() {
    try {
      await navigator.clipboard.writeText(ALIAS);
    } catch {
      const campo = document.createElement("textarea");
      campo.value = ALIAS;
      document.body.appendChild(campo);
      campo.select();
      document.execCommand("copy");
      document.body.removeChild(campo);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  }

  return (
    <main className="invitacion" id="top">
      {/* 1. PRESENTACIÓN (fondo2.jpg) */}
      <section className="seccion-invitacion seccion-foto seccion-presentacion">
        <nav className="hero-nav" aria-label="Navegación">
          <span className="hero-logo" aria-hidden="true">
            M.
          </span>
          <div className="hero-links">
            <a href="#datos-fiesta">LA FIESTA</a>
            <a href="#confirmacion">CONFIRMAR ASISTENCIA</a>
          </div>
        </nav>

        <Mariposas />

        <div className="contenido-invitacion">
          <p className="hero-eyebrow">
            <span className="hero-linea" aria-hidden="true" />
            ESTÁS INVITADO A MIS XV
          </p>

          <h2 className="nombre-maia">Maia</h2>

          <p className="hero-lema">Una noche para disfrutar.</p>

          <p className="hero-fecha">
            28 . 11 . 2026
            <span aria-hidden="true">✦</span>
            21:00 hs
          </p>

          <p className="hero-texto">
            Hay noches que se sueñan toda la vida.
            <br />
            Esta es la mía, y quiero vivirla con vos.
          </p>

          <button
            className="hero-boton"
            type="button"
            onClick={() => abrirWhatsApp(MSJ_CONFIRMAR)}
          >
            ¡VOY A ESTAR!
          </button>
        </div>
      </section>

      <Separador />

      {/* 2. CUENTA REGRESIVA (claro) */}
      <section
        id="cuenta-regresiva"
        className="seccion-invitacion seccion-cuenta"
      >
        <Icono nombre="sparkles" className="esquina esquina-1" />
        <Icono nombre="star" className="esquina esquina-2" />
        <Icono nombre="star" className="esquina esquina-3" />
        <Icono nombre="sparkles" className="esquina esquina-4" />

        <div className="contenido-invitacion">
          <p className="eyebrow">LA MAGIA ESTÁ POR COMENZAR</p>
          <h2 className="titulo-claro">
            El momento que <em>tanto soñé.</em>
          </h2>

          <div className="cuenta-regresiva">
            <div className="bloque-tiempo">
              <strong>{String(tiempoRestante.dias).padStart(2, "0")}</strong>
              <span>DÍAS</span>
            </div>
            <div className="bloque-tiempo">
              <strong>{String(tiempoRestante.horas).padStart(2, "0")}</strong>
              <span>HORAS</span>
            </div>
            <div className="bloque-tiempo">
              <strong>{String(tiempoRestante.minutos).padStart(2, "0")}</strong>
              <span>MINUTOS</span>
            </div>
            <div className="bloque-tiempo">
              <strong>
                {String(tiempoRestante.segundos).padStart(2, "0")}
              </strong>
              <span>SEGUNDOS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DATOS DE LA FIESTA (oscuro) */}
      <section id="datos-fiesta" className="seccion-invitacion seccion-datos">
        <img
          className="marca-agua marca-agua-a"
          src="/mariposa.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <img
          className="marca-agua marca-agua-b"
          src="/mariposa.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="contenido-invitacion">
          <div className="datos-texto">
            <p className="eyebrow eyebrow-cian">AGENDÁ ESTA FECHA</p>
            <h2 className="titulo-oscuro">
              Una noche.
              <br />
              Mil recuerdos.
            </h2>
            <p className="texto-oscuro">
              Las mariposas ya revolotean, las luces también.
              <br />
              Solo faltás vos para hacer esta noche inolvidable.
            </p>

            <a
              className="boton-contorno"
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Icono nombre="pin" />
              CÓMO LLEGAR 
              <Icono nombre="flecha" />
            </a>
          </div>

          <div className="programa">
            <div className="programa-fecha">
              <span className="fecha-dia">28</span>
              <p>
                SÁBADO
                <br />
                NOVIEMBRE 2026
              </p>
            </div>

            <ol className="linea-tiempo">
              <li>
                <span className="hora">21:00 hs</span>
                <h3>Recepción</h3>
                <p>Comienza la noche y empezamos a recibirlos.</p>
              </li>
              <li className="hito-destacado">
                <span className="hora">21:30 hs</span>
                <h3>Entra la quinceañera</h3>
                <p>
                  Se apagan las luces y empieza la magia. Mejor vivirlo en vivo.
                </p>
              </li>
              <li>
                <span className="hora">05:00 hs</span>
                <h3>Cierre</h3>
                <p>El final de una noche inolvidable.</p>
              </li>
            </ol>

            <div className="programa-lugar">
              <Icono nombre="pin" />
              <div>
                <h3>Nos encontramos en el salón</h3>
                <p>
                  Te dejé la ubicación para que llegues directo a la fiesta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeparadorMariposa />

      {/* 4. DRESS CODE Y ALIAS (claro con cuadrícula) */}
      <section className="seccion-invitacion seccion-detalles">
        <Icono nombre="sparkles" className="esquina esquina-1" />
        <Icono nombre="star" className="esquina esquina-2" />

        <div className="contenido-invitacion">
          <div className="bloque-claro" id="dress-code">
            <Icono nombre="shirt" className="icono-grande" />
            <p className="eyebrow">DRESS CODE</p>
            <h2 className="titulo-claro">Elegante</h2>
            <p className="texto-claro">
              Tu mejor look, listo para la pista.
              <br />
              Estos colores están reservados para la quinceañera:
            </p>
            <div className="colores-reservados">
              <span className="color-reservado">
                <i className="punto punto-azul" aria-hidden="true" /> Azul
              </span>
              <span className="color-reservado">
                <i className="punto punto-dorado" aria-hidden="true" /> Dorado
              </span>
            </div>
            <p className="nota-claro">Te pedimos no usarlos esa noche.</p>
          </div>

          <hr className="divisor-claro" />

          <div className="bloque-claro" id="regalo">
            <Icono nombre="gift" className="icono-grande" />
            <p className="eyebrow">UN DETALLE CON AMOR</p>
            <h2 className="titulo-claro">El mejor regalo es que estés.</h2>
            <p className="texto-claro">
              Si querés hacerme un regalo, podés hacerlo por transferencia o
              dejar un sobre en el salón.
            </p>

            <div className="alias-fila">
              <span className="alias-texto">{ALIAS}</span>
              <button
                className="boton-icono"
                type="button"
                onClick={copiarAlias}
                aria-label="Copiar alias"
              >
                <Icono nombre="copy" />
              </button>
            </div>
            <p className="nota-claro" aria-live="polite">
              {copiado ? "¡Alias copiado!" : "Tocá el ícono para copiarlo"}
            </p>
          </div>
        </div>
      </section>

      <Separador />

      {/* 5. MÚSICA (fondo3.jpg) */}
      <section
        id="musica"
        className="seccion-invitacion seccion-foto seccion-musica"
      >
        <Mariposas />
        <div className="contenido-invitacion">
          <Icono nombre="music" className="icono-grande icono-cian" />
          <p className="subtitulo">HAGAMOS LA PLAYLIST JUNTOS</p>
          <h2 className="titulo-seccion">¿Qué tema no puede faltar?</h2>

          <p className="frase-invitacion">
            Contame qué canción te hace bailar y la sumo a la lista de la
            fiesta.
          </p>

          <button
            className="boton-confirmacion"
            type="button"
            onClick={() => abrirWhatsApp(MSJ_MUSICA)}
          >
            Recomendar canciones 
          </button>
        </div>
      </section>

      <SeparadorMariposa />

      {/* 6. CONFIRMACIÓN (fondo4.jpg) */}
      <section
        id="confirmacion"
        className="seccion-invitacion seccion-foto seccion-confirmacion"
      >
        <Mariposas />
        <div className="contenido-invitacion">
          <div className="confirmar-texto">
            <p className="hero-eyebrow">
              <span className="hero-linea" aria-hidden="true" />
              QUIERO COMPARTIRLO CON VOS
            </p>
            <h2 className="nombre-maia">Maia</h2>
            <p className="quince">Mis quince años</p>
            <p className="frase-invitacion">
              Tu presencia hará que esta noche sea todavía más especial. ¡Te
              espero para celebrar juntos!
            </p>
          </div>

          <div className="confirmar-tarjeta">
            <p className="etiqueta-vidrio">TE ESPERO</p>
            <ul className="confirmar-datos">
              <li>
                <Icono nombre="calendar" />
                <span>Sábado 28 de noviembre · 21:00 hs</span>
              </li>
              <li>
                <Icono nombre="pin" />
                <a href={MAPS_URL} target="_blank" rel="noreferrer">
                  Ver cómo llegar
                </a>
              </li>
            </ul>

            <button
              className="boton-confirmacion"
              type="button"
              onClick={() => abrirWhatsApp(MSJ_CONFIRMAR)}
            >
              Confirmar asistencia 
            </button>

            <p className="nota-vidrio">
              Confirmá tu asistencia para que todo salga perfecto.
            </p>
          </div>

          <div className="confirmar-pie">
            <p className="cierre-invitacion">
              Una noche mágica nos espera <span aria-hidden="true">✨</span>
            </p>
            <a
              className="volver-inicio"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Volver al comienzo 
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Invitacion;
