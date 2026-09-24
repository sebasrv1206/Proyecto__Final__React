import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Camera,
  UserRound,
  VenusAndMars,
  Mail,
  Phone,
  Cake,
  Globe,
  Home,
  Briefcase,
  KeyRound,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import fotoMessi from "../../assets/perfil-messi.jpg";

function formatearFecha(fecha) {
  if (!fecha) return null;
  const partes = fecha.split("-");
  if (partes.length !== 3) return fecha;
  const [anio, mes, dia] = partes;
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${parseInt(dia, 10)} de ${meses[parseInt(mes, 10) - 1]} de ${anio}`;
}

function Fila({ icono: Icono, titulo, valor }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <Icono size={20} className="text-slate-400 dark:text-slate-500 shrink-0" />
      <div className="min-w-0">
        <p className="font-semibold text-slate-800 dark:text-slate-100">{titulo}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
          {valor || "No definido"}
        </p>
      </div>
    </div>
  );
}

export function Perfil() {
  const { sesionActiva, usuario, cerrarSesion } = useAuth();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const navigate = useNavigate();

  const confirmarCierreSesion = () => {
    cerrarSesion();
    setMostrarConfirmacion(false);
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  if (!sesionActiva) {
    return (
      <section className="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            No has iniciado sesión
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Inicia sesión desde el botón "Login" para ver tu perfil.
          </p>
        </div>
      </section>
    );
  }

  const fotoPerfil = usuario?.foto || fotoMessi;
  const inicial = usuario?.nombre?.charAt(0).toUpperCase() || "?";

  return (
    <section className="bg-slate-50 dark:bg-slate-900 min-h-screen px-6 py-10 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Información personal
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Los datos que registraste al crear tu cuenta.
        </p>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 overflow-hidden transition-colors duration-300">
          <div className="flex items-center gap-4 px-5 py-5 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200 border-b border-slate-200 dark:border-slate-700">
            <Camera size={20} className="text-slate-400 dark:text-slate-500 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-slate-800 dark:text-slate-100">Foto de perfil</p>
            </div>

            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-cyan-500 shrink-0">
              {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg">
                  {inicial}
                </div>
              )}
            </div>
          </div>

          <Fila icono={UserRound} titulo="Nombre" valor={usuario?.nombre} />
          <Fila icono={VenusAndMars} titulo="Género" valor={usuario?.genero} />
          <Fila icono={Mail} titulo="Correo" valor={usuario?.correo} />
          <Fila icono={Phone} titulo="Teléfono" valor={usuario?.telefono} />
          <Fila
            icono={Cake}
            titulo="Fecha de nacimiento"
            valor={formatearFecha(usuario?.cumpleanos)}
          />
          <Fila icono={Globe} titulo="Idioma" valor={usuario?.idioma || "Español (Colombia)"} />
          <Fila icono={Home} titulo="Dirección de casa" valor={null} />
          <Fila icono={Briefcase} titulo="Dirección de trabajo" valor={null} />
          <Fila icono={KeyRound} titulo="Contraseña" valor="••••••••" />
        </div>

        <button
          type="button"
          onClick={() => setMostrarConfirmacion(true)}
          className="mt-6 flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>

      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              ¿Cerrar sesión?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Tendrás que iniciar sesión de nuevo para continuar.
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
                onClick={confirmarCierreSesion}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Perfil;