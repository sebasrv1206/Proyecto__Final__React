import { useState, useRef, useEffect } from "react";
import "./Escenario.css";
import Camello from "./Camello";
import BotonIzquierda from "./BotonIzquierda";
import BotonDerecha from "./BotonDerecha";
import BotonReiniciar from "./BotonReiniciar";

const LIMITE_MIN = 0;
const LIMITE_MAX = 300;
const PASO = 20;
const MARGEN = 20;
const POSICION_INICIAL = 150;

function Escenario() {
  const [posicion, setPosicion] = useState(POSICION_INICIAL);
  const [mirandoIzquierda, setMirandoIzquierda] = useState(false);
  const [huellas, setHuellas] = useState([]);
  const [caminando, setCaminando] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function activarAnimacionCaminar() {
    setCaminando(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCaminando(false), 350);
  }

  function moverDerecha() {
    const destino = Math.min(LIMITE_MAX, posicion + PASO);
    if (destino === posicion) return;
    setHuellas((prev) => [...prev.slice(-14), posicion]);
    setMirandoIzquierda(false);
    setPosicion(destino);
    activarAnimacionCaminar();
  }

  function moverIzquierda() {
    const destino = Math.max(LIMITE_MIN, posicion - PASO);
    if (destino === posicion) return;
    setHuellas((prev) => [...prev.slice(-14), posicion]);
    setMirandoIzquierda(true);
    setPosicion(destino);
    activarAnimacionCaminar();
  }

  function reiniciar() {
    setHuellas([]);
    setMirandoIzquierda(false);
    setPosicion(POSICION_INICIAL);
    activarAnimacionCaminar();
  }

  const enLimiteIzquierdo = posicion === LIMITE_MIN;
  const enLimiteDerecho = posicion === LIMITE_MAX;

  return (
    <div className="cdd-container">
      <h2 className="cdd-title">🐫 Caravana del Desierto</h2>

      <div className="cdd-scene">
        <div className="cdd-sun" />

        <svg
          className="cdd-duna cdd-duna-1"
          viewBox="0 0 340 60"
          preserveAspectRatio="none"
        >
          <path d="M0,40 Q85,10 170,32 T340,20 V60 H0 Z" fill="#B8823E" />
        </svg>

        <svg
          className="cdd-duna cdd-duna-2"
          viewBox="0 0 340 60"
          preserveAspectRatio="none"
        >
          <path d="M0,30 Q90,55 180,25 T340,40 V60 H0 Z" fill="#DDAE66" />
        </svg>

        {huellas.map((h, i) => (
          <span
            key={i}
            className="cdd-huella"
            style={{ left: MARGEN + h, transform: "translateX(-50%)" }}
          >
            ∙∙
          </span>
        ))}

        <Camello
          posicion={posicion}
          mirandoIzquierda={mirandoIzquierda}
          caminando={caminando}
        />

        <div className="cdd-suelo" />
      </div>

      <div className="cdd-badge-wrap">
        <div className="cdd-badge">
          📍 Posición: {posicion} px{" "}
          <span className="cdd-badge-limites">
            (límites {LIMITE_MIN}–{LIMITE_MAX})
          </span>
        </div>
      </div>

      <div className="cdd-controles">
        <BotonIzquierda mover={moverIzquierda} disabled={enLimiteIzquierdo} />
        <BotonReiniciar mover={reiniciar} />
        <BotonDerecha mover={moverDerecha} disabled={enLimiteDerecho} />
      </div>

      {(enLimiteIzquierdo || enLimiteDerecho) && (
        <p className="cdd-limite-msg">
          🌵 El camello llegó al borde del oasis, no puede seguir por aquí.
        </p>
      )}
    </div>
  );
}

export default Escenario;
