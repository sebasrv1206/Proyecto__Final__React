import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
const CLAVE_CARRITO = "carrito";

function leerCarritoDesdeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_CARRITO);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = useCallback((personaje) => {
    setCarrito((prev) => {
      const yaExiste = prev.find((item) => item.id === personaje.id);
      if (yaExiste) {
        return prev.map((item) =>
          item.id === personaje.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: personaje.id,
          name: personaje.name,
          image: personaje.image,
          episodio: personaje.episodio,
          precio: personaje.precio,
          cantidad: 1,
        },
      ];
    });
  }, []);

  const eliminarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
