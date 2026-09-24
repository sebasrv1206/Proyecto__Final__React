import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function CharacterCard({ personaje }) {
  const { sesionActiva } = useAuth();
  const { agregarAlCarrito } = useCart();

  const manejarAgregar = () => {
    if (!sesionActiva) {
      toast.error("Debes iniciar sesión para agregar productos al carrito");
      return;
    }

    agregarAlCarrito(personaje);
    toast.success(`${personaje.name} agregado al carrito`);
  };

  // Helper para verificar si un arreglo de la Disney API tiene contenido real
  const obtenerTexto = (items) => {
    if (Array.isArray(items) && items.length > 0) {
      return items.join(", ");
    }
    return null;
  };

  const peliculas = obtenerTexto(personaje.films);
  const series = obtenerTexto(personaje.tvShows);
  const cortos = obtenerTexto(personaje.shortFilms);
  const videojuegos = obtenerTexto(personaje.videoGames);
  const atracciones = obtenerTexto(personaje.parkAttractions);
  const aliados = obtenerTexto(personaje.allies);
  const enemigos = obtenerTexto(personaje.enemies);

  // Comprobar si al menos una categoría de la API tiene información
  const tieneDatosAPI = peliculas || series || cortos || videojuegos || atracciones || aliados || enemigos;

  return (
    <div className="bg-slate-800 rounded-2xl p-4 flex flex-col justify-between border border-slate-700 shadow-lg text-white transition-all duration-300">
      <div>
        {/* Imagen del personaje con insignia semitransparente estilo glassmorphism */}
        <div className="relative mb-3 overflow-hidden rounded-xl">
          <img
            src={personaje.imageUrl || personaje.image}
            alt={personaje.name}
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-2.5 right-2.5 bg-blue-600/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-md">
            DISNEY
          </span>
        </div>

        {/* Nombre del personaje */}
        <h3 className="font-bold text-center text-xl text-white mt-2">
          {personaje.name}
        </h3>

        {/* Detalles dinámicos o descripción fija si no hay datos */}
        <div className="mt-3 space-y-1.5 text-xs text-slate-300">
          {peliculas && (
            <p className="line-clamp-2">
              <span className="font-semibold text-cyan-400">Películas:</span> {peliculas}
            </p>
          )}

          {series && (
            <p className="line-clamp-2">
              <span className="font-semibold text-cyan-400">Series TV:</span> {series}
            </p>
          )}

          {cortos && (
            <p className="line-clamp-1">
              <span className="font-semibold text-cyan-400">Cortos:</span> {cortos}
            </p>
          )}

          {videojuegos && (
            <p className="line-clamp-1">
              <span className="font-semibold text-cyan-400">Videojuegos:</span> {videojuegos}
            </p>
          )}

          {atracciones && (
            <p className="line-clamp-1">
              <span className="font-semibold text-cyan-400">Atracciones:</span> {atracciones}
            </p>
          )}

          {aliados && (
            <p className="line-clamp-1">
              <span className="font-semibold text-cyan-400">Aliados:</span> {aliados}
            </p>
          )}

          {enemigos && (
            <p className="line-clamp-1">
              <span className="font-semibold text-cyan-400">Enemigos:</span> {enemigos}
            </p>
          )}

          {/* Ficha descriptiva automática si todos los arreglos de la API vienen vacíos */}
          {!tieneDatosAPI && (
            <div className="bg-slate-700/40 rounded-lg p-2.5 text-slate-300 text-[11px] leading-relaxed border border-slate-600/30 my-2">
              <p className="font-medium text-slate-200 mb-0.5">Ficha del personaje:</p>
              <p className="text-slate-400">
                Personaje clásico de la franquicia animada de Disney. Aparece en el catálogo oficial de personajes de la marca.
              </p>
            </div>
          )}

          {/* Precio formateado */}
          {personaje.precio && (
            <p className="text-center text-cyan-400 font-bold text-lg pt-1">
              ${personaje.precio.toLocaleString("es-CO")} COP
            </p>
          )}
        </div>
      </div>

      {/* Botón con validación de inicio de sesión */}
      <button
        type="button"
        onClick={manejarAgregar}
        className="mt-4 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-semibold transition-all duration-200"
      >
        Agregar al carrito
      </button>
    </div>
  );
}