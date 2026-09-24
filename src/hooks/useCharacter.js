import { useEffect, useState } from "react";

const RANGO_PRECIO = { min: 7000, max: 50000 };

function precioAleatorio() {
  return Math.floor(Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)) + RANGO_PRECIO.min;
}

export function useCharacters(pagina = 1) {
  const [personajes, setPersonajes] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarPersonajes() {
      try {
        setCargando(true);
        // Disney API endpoint con paginación
        const resPersonajes = await fetch(`https://api.disneyapi.dev/character?page=${pagina}&pageSize=20`);
        if (!resPersonajes.ok) throw new Error("No se pudo cargar el catálogo de Disney");

        const responseData = await resPersonajes.json();

        // Mapeamos los datos adaptándolos a las propiedades de Disney
        const listaNormalizada = (responseData.data || []).map((personaje) => {
          const pelicula = personaje.films && personaje.films.length > 0 ? personaje.films[0] : null;
          const show = personaje.tvShows && personaje.tvShows.length > 0 ? personaje.tvShows[0] : null;

          return {
            id: personaje._id,
            name: personaje.name,
            image: personaje.imageUrl || "https://via.placeholder.com/300x300?text=No+Image",
            aparicion: pelicula ? `Película: ${pelicula}` : show ? `Show: ${show}` : "Sin registros",
            precio: precioAleatorio(),
          };
        });

        if (activo) {
          setPersonajes(listaNormalizada);
          setTotalPaginas(responseData.info?.totalPages || 1);
        }
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarPersonajes();
    return () => { activo = false; };
  }, [pagina]);

  return { personajes, totalPaginas, cargando, error };
}