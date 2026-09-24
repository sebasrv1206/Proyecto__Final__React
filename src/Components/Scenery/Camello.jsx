const MARGEN = 20;

function Camello({ posicion, mirandoIzquierda, caminando }) {
  return (
    <div
      className={`absolute bottom-[46px] text-[44px] leading-none drop-shadow-[0_6px_4px_rgba(46,36,84,0.35)] transition-[left] duration-350 ease-[cubic-bezier(0.34,1.2,0.64,1)] z-10 select-none ${
        caminando ? "animate-[bounce_0.3s_infinite]" : "animate-[pulse_2.6s_infinite]"
      }`}
      style={{
        left: MARGEN + posicion,
        transform: `translateX(-50%) scaleX(${mirandoIzquierda ? -1 : 1})`,
      }}
    >
      🐫
    </div>
  );
}

export default Camello;