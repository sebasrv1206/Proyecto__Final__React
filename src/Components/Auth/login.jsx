import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import fotoMessi from "../../assets/perfil-messi.jpg";

function Login({ onClose }) {
  const { registrarse, iniciarSesion } = useAuth();
  const [modo, setModo] = useState("registro");

  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cumpleanos, setCumpleanos] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarRegistro = (e) => {
    e.preventDefault();
    const resultado = registrarse({
      nombre,
      genero,
      correo,
      telefono,
      cumpleanos,
      contrasena,
      foto: fotoMessi,
      idioma: "Español (Colombia)",
    });

    if (!resultado.ok) {
      toast.error(resultado.mensaje);
      return;
    }

    toast.success(`¡Bienvenido, ${nombre}!`);
    onClose?.();
  };

  const manejarInicioSesion = (e) => {
    e.preventDefault();
    const resultado = iniciarSesion(correo, contrasena);

    if (!resultado.ok) {
      toast.error(resultado.mensaje);
      return;
    }

    toast.success("Sesión iniciada correctamente");
    onClose?.();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#0A0B10]/85 backdrop-blur-md flex justify-center items-center z-[1000]">
      <div className="bg-[#141622] border border-[#FF9F1C] rounded-[20px] px-10 py-[30px] w-[90%] max-w-[400px] shadow-[0_0_30px_rgba(255,159,28,0.3)] relative text-center max-h-[90vh] overflow-y-auto">
        {onClose && (
          <button
            className="absolute top-[15px] right-[15px] bg-transparent border-none text-[#E76F51] text-lg font-bold cursor-pointer transition-colors duration-200 hover:text-[#FF4D4D]"
            onClick={onClose}
          >
            ✕
          </button>
        )}

        <div className="flex gap-2 bg-[#0E0F15] rounded-[14px] p-1 mb-[20px]">
          <button
            type="button"
            className={`flex-1 p-[10px] border-none rounded-[10px] text-[#F0E6D2] font-semibold text-[13px] cursor-pointer transition-colors duration-200 ${
              modo === "registro"
                ? "bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-[#0E0F15]"
                : "bg-transparent hover:text-[#FFB703]"
            }`}
            onClick={() => setModo("registro")}
          >
            Regístrate
          </button>
          <button
            type="button"
            className={`flex-1 p-[10px] border-none rounded-[10px] text-[#F0E6D2] font-semibold text-[13px] cursor-pointer transition-colors duration-200 ${
              modo === "sesion"
                ? "bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-[#0E0F15]"
                : "bg-transparent hover:text-[#FFB703]"
            }`}
            onClick={() => setModo("sesion")}
          >
            Iniciar sesión
          </button>
        </div>

        {modo === "registro" ? (
          <form className="flex flex-col gap-[15px]" onSubmit={manejarRegistro}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            />
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            >
              <option value="" disabled>
                Género
              </option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
            </select>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            />
            <input
              type="date"
              value={cumpleanos}
              onChange={(e) => setCumpleanos(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            />
            <button
              type="submit"
              className="p-[12px] border-none rounded-[10px] bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-[#0E0F15] font-bold text-[14px] uppercase cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_4px_15px_rgba(255,183,3,0.4)]"
            >
              Registrarse
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-[15px]" onSubmit={manejarInicioSesion}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="px-4 py-[12px] rounded-[10px] border border-[#FFB703]/30 bg-[#0E0F15] text-[#F0E6D2] text-[14px] outline-none transition-colors duration-300 focus:border-[#FFB703] focus:shadow-[0_0_8px_rgba(255,183,3,0.4)]"
            />
            <button
              type="submit"
              className="p-[12px] border-none rounded-[10px] bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-[#0E0F15] font-bold text-[14px] uppercase cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_4px_15px_rgba(255,183,3,0.4)]"
            >
              Iniciar sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;