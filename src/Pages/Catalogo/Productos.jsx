import { useState } from "react";
import { useCharacters } from "../../hooks/useCharacter.js";
import CharacterCard from "../../Components/Catalogo/CharacaterCard.jsx";

export function Productos() {
  const [pagina, setPagina] = useState(1);
  const { personajes, totalPaginas, cargando, error } = useCharacters(pagina);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 min-h-screen px-6 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Catálogo</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Personajes de Disney disponibles en la tienda
        </p>

        {cargando && <p className="mt-10 text-center text-slate-400">Cargando personajes...</p>}
        {error && <p className="mt-10 text-center text-rose-500">{error}</p>}

        {!cargando && !error && (
          <>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {personajes.map((personaje) => (
                <CharacterCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                disabled={pagina === 1}
                className="px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600
                           text-slate-600 dark:text-slate-300 font-semibold
                           hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400
                           transition-colors duration-200
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-600 dark:disabled:hover:border-slate-600 dark:disabled:hover:text-slate-300"
              >
                Anterior
              </button>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Página {pagina} de {totalPaginas}
              </span>
              <button
                type="button"
                onClick={() => setPagina((prev) => Math.min(prev + 1, totalPaginas))}
                disabled={pagina === totalPaginas}
                className="px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600
                           text-slate-600 dark:text-slate-300 font-semibold
                           hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400
                           transition-colors duration-200
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-600 dark:disabled:hover:border-slate-600 dark:disabled:hover:text-slate-300"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Productos;
