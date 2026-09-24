/**
 * Contenedor único que envuelve todo el contenido enrutado de la aplicación.
 * Se usa una sola vez desde Layout, no dentro de cada página.
 * Reutiliza la estética dorada/ámbar ya establecida en Cabecera, Navbar y Login
 * para que el sitio se sienta consistente tanto en modo claro como en modo oscuro.
 */
function PageContainer({ children, className = "" }) {
  return (
    <div
      className={`w-[92%] max-w-[1200px] mx-auto my-6 rounded-[24px] overflow-hidden
                  bg-white border border-amber-400/50 shadow-[0_10px_35px_rgba(217,119,6,0.12)]
                  dark:bg-[#141622] dark:border-[#FF9F1C]/35 dark:shadow-[0_10px_35px_rgba(255,159,28,0.15)]
                  transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default PageContainer;
