import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const IVA_PORCENTAJE = 0.19;

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCart();
  const { sesionActiva } = useAuth();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarConfirmacionVaciar, setMostrarConfirmacionVaciar] = useState(false);
  
  // Estado para controlar qué producto específico se desea eliminar
  const [itemAEliminar, setItemAEliminar] = useState(null);

  // El precio de los productos ya incluye el IVA (Ingeniería inversa)
  const totalAPagar = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const subtotal = Math.round(totalAPagar / (1 + IVA_PORCENTAJE));
  const iva = totalAPagar - subtotal;

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Validación de inicio de sesión antes de proceder con el pago
  const intentarPagar = () => {
    if (!sesionActiva) {
      toast.error("Debes iniciar sesión para realizar el pago");
      return;
    }
    setMostrarConfirmacion(true);
  };

  const confirmarPedido = () => {
    vaciarCarrito();
    setMostrarConfirmacion(false);
    toast.success("Tu pedido fue enviado correctamente");
  };

  const confirmarVaciado = () => {
    vaciarCarrito();
    setMostrarConfirmacionVaciar(false);
    toast.success("Carrito vaciado");
  };

  // Función para confirmar la eliminación de un solo elemento
  const confirmarEliminacionItem = () => {
    if (itemAEliminar) {
      eliminarDelCarrito(itemAEliminar.id);
      toast.success(`${itemAEliminar.name} eliminado del carrito`);
      setItemAEliminar(null);
    }
  };

  if (carrito.length === 0) {
    return (
      <section className="bg-slate-50 dark:bg-slate-900 min-h-screen px-6 py-10 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingBag className="mx-auto text-slate-300 dark:text-slate-600" size={64} />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-4">
            Tu carrito está vacío
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Agrega personajes desde el catálogo para verlos aquí.
          </p>
          <Link
            to="/Catalogo"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Ir al catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 dark:bg-slate-900 min-h-screen px-6 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Tu carrito</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {totalUnidades} {totalUnidades === 1 ? "personaje listo" : "personajes listos"} para el envío
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMostrarConfirmacionVaciar(true)}
            className="text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:ring-cyan-300 dark:hover:ring-cyan-700"
              >
                {/* Imagen del producto */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Datos del producto */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Episodio: {item.episodio}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      x{item.cantidad}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatearPrecio(item.precio)} c/u
                    </span>
                  </div>
                </div>

                {/* Precio acumulado y botón de eliminar */}
                <div className="text-right shrink-0">
                  <p className="font-bold text-cyan-600 dark:text-cyan-400">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setItemAEliminar(item)}
                    title="Eliminar del carrito"
                    className="mt-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full p-2 transition-colors duration-200 active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 p-6 transition-colors duration-300">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-semibold text-lg mb-4">
              <Sparkles size={18} className="text-cyan-500" />
              Resumen del pedido
            </div>

            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Subtotal</span>
              <span>{formatearPrecio(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300 mt-2">
              <span>IVA (19%)</span>
              <span>{formatearPrecio(iva)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-slate-100 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <span>Total a pagar</span>
              <span>{formatearPrecio(totalAPagar)}</span>
            </div>

            <button
              type="button"
              onClick={intentarPagar}
              className="mt-6 w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Enviar Pedido
            </button>

            <Link
              to="/Catalogo"
              className="mt-3 block text-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
            >
              Seguir explorando el catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar un producto individual */}
      {itemAEliminar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              ¿Eliminar producto?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              ¿Estás seguro de que deseas quitar a{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                "{itemAEliminar.name}"
              </span>{" "}
              del carrito?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setItemAEliminar(null)}
                className="flex-1 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarEliminacionItem}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de pedido */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              ¿Confirmas tu pedido?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Total a pagar: {formatearPrecio(totalAPagar)}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setMostrarConfirmacion(false)}
                className="flex-1 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarPedido}
                className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors duration-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para vaciar carrito */}
      {mostrarConfirmacionVaciar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              ¿Vaciar el carrito?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Se {totalUnidades === 1 ? "eliminará 1 personaje" : `eliminarán los ${totalUnidades} personajes`} agregado{totalUnidades === 1 ? "" : "s"}.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setMostrarConfirmacionVaciar(false)}
                className="flex-1 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarVaciado}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200"
              >
                Vaciar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Carrito;