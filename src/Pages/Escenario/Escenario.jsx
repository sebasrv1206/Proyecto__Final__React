import { useState, useRef, useEffect } from "react";
import Camello from "../../Components/Scenery/Camello";
import BotonIzquierda from "../../Components/Scenery/BotonIzquierda";
import BotonDerecha from "../../Components/Scenery/BotonDerecha";
import BotonReiniciar from "../../Components/Scenery/BotonReiniciar";

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
    <section className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-6 py-10 transition-colors duration-300 font-['Baloo_2','Trebuchet_MS',sans-serif]">
      <div className="max-w-[420px] mx-auto text-[#3b2a5e] dark:text-[#fff3e0] transition-colors duration-300">
        <h2 className="text-center text-[26px] font-bold mb-[14px] tracking-[0.5px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
          🐫 Caravana del Desierto
        </h2>

        {/* Escena */}
        <div className="relative w-[340px] h-[190px] mx-auto rounded-[20px] overflow-hidden bg-gradient-to-b from-[#2e2454] via-[#5b3e73] via-72% to-[#f0d9a8] shadow-[0_10px_24px_rgba(46,36,84,0.5)]">
          {/* Sol */}
          <div className="absolute top-[26px] right-[40px] w-[46px] h-[46px] rounded-full bg-[radial-gradient(circle,#ffe3a3_0%,#f2a65a_60%,transparent_75%)] shadow-[0_0_30px_10px_rgba(242,166,90,0.55)] animate-pulse z-0" />

          {/* Duna 1 */}
          <svg
            className="absolute left-0 bottom-0 w-full h-[60px] z-0"
            viewBox="0 0 340 60"
            preserveAspectRatio="none"
          >
            <path d="M0,40 Q85,10 170,32 T340,20 V60 H0 Z" fill="#B8823E" />
          </svg>

          {/* Duna 2 */}
          <svg
            className="absolute left-0 -bottom-[4px] w-full h-[60px] z-0"
            viewBox="0 0 340 60"
            preserveAspectRatio="none"
          >
            <path d="M0,30 Q90,55 180,25 T340,40 V60 H0 Z" fill="#DDAE66" />
          </svg>

          {/* Huellas */}
          {huellas.map((h, i) => (
            <span
              key={i}
              className="absolute bottom-[40px] text-[9px] color-[#b8823e] opacity-55 z-0"
              style={{ left: MARGEN + h, transform: "translateX(-50%)" }}
            >
              ∙∙
            </span>
          ))}

          {/* Camello */}
          <Camello
            posicion={posicion}
            mirandoIzquierda={mirandoIzquierda}
            caminando={caminando}
          />

          {/* Suelo */}
          <div className="absolute bottom-0 left-0 w-full h-[26px] bg-[#ddae66]" />
        </div>

        {/* Placa de Posición */}
        <div className="flex justify-center mt-[14px]">
          <div className="bg-[#5b3e73] text-white border-2 border-[#f2a65a] rounded-full px-[18px] py-[6px] text-sm font-semibold shadow-[0_4px_10px_rgba(46,36,84,0.4)]">
            📍 Posición: {posicion} px{" "}
            <span className="opacity-70 font-normal">
              (límites {LIMITE_MIN}–{LIMITE_MAX})
            </span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-center gap-[14px] mt-[18px]">
          <BotonIzquierda mover={moverIzquierda} disabled={enLimiteIzquierdo} />
          <BotonReiniciar mover={reiniciar} />
          <BotonDerecha mover={moverDerecha} disabled={enLimiteDerecho} />
        </div>

        {/* Mensaje de Límite */}
        {(enLimiteIzquierdo || enLimiteDerecho) && (
          <p className="text-center text-xs opacity-75 mt-[10px]">
            🌵 El camello llegó al borde del oasis, no puede seguir por aquí.
          </p>
        )}
      </div>
    </section>
  );
}

export default Escenario;