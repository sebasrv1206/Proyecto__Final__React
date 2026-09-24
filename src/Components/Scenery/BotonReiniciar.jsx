function BotonReiniciar({ mover }) {
  return (
    <button
      className="w-14 h-14 rounded-2xl border-none text-2xl cursor-pointer bg-gradient-to-b from-[#f0d9a8] to-[#ddae66] shadow-[0_4px_0_#b8823e,0_6px_10px_rgba(46,36,84,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_0_#b8823e,0_10px_16px_rgba(46,36,84,0.4)] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#b8823e,0_2px_4px_rgba(46,36,84,0.35)]"
      onClick={mover}
      title="Reiniciar al centro"
    >
      🔄
    </button>
  );
}

export default BotonReiniciar;