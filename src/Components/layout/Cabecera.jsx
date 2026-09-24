import { Link } from "react-router-dom";
import { ShoppingCart, Sun, Moon, UserRound } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";


function Cabecera({ setMostrarLogin }) {
  const { totalItems } = useCart();
  const { tema, cambiarTema } = useTheme();
  const { sesionActiva } = useAuth();

  return (
    <header className="flex justify-between items-center bg-[#0E0F15] px-[30px] py-[12px] w-[90%] max-w-[1200px] my-[15px] mx-auto border border-[#FF9F1C] rounded-[16px] shadow-[0_4px_20px_rgba(255,159,28,0.2)] box-border">
      <h1 className="text-[#FFB703] text-[24px] font-extrabold m-0 tracking-[1.5px] uppercase drop-shadow-[0_0_12px_rgba(255,183,3,0.3)]">
        Sebas La MAGIKK 🐫
      </h1>

      <div className="flex items-center gap-3">
        <Link
          to="/Carrito"
          title="Ver carrito"
          className="relative p-2 rounded-full text-[#F0E6D2] hover:bg-[#FF9F1C]/20 hover:text-[#FFB703] hover:scale-110 transition-all duration-200"
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FFB703] text-[#0E0F15] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={cambiarTema}
          title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
          className="p-2 rounded-full text-[#F0E6D2] hover:bg-[#FF9F1C]/20 hover:text-[#FFB703] hover:scale-110 transition-all duration-200"
        >
          {tema === "claro" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {sesionActiva ? (
          <Link
            to="/Perfil"
            title="Ver perfil"
            className="p-2 rounded-full bg-[#FF9F1C]/15 text-[#FFB703] hover:bg-[#FF9F1C]/30 hover:scale-110 transition-all duration-200"
          >
            <UserRound size={20} />
          </Link>
        ) : (
          <button
            className="px-5 py-2 border border-[#FF9F1C] rounded-full text-[#FF9F1C] font-bold text-[13px] uppercase bg-[#FF9F1C]/10 cursor-pointer transition-all duration-300 hover:bg-[#FF9F1C] hover:text-[#0E0F15] hover:shadow-[0_0_15px_rgba(255,159,28,0.6)]"
            onClick={() => setMostrarLogin(true)}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Cabecera;