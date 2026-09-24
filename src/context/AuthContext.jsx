import { createContext, useContext, useState, useEffect, useCallback } from "react";
import fotoMessi from "../assets/perfil-messi.jpg"; // Asegúrate de ubicar la foto en esta ruta

const AuthContext = createContext();
const CLAVE_AUTH = "sesionActiva";
const CLAVE_USUARIO = "usuario";
const CLAVE_USUARIOS_REGISTRADOS = "usuariosRegistrados";

function leerSesionDesdeStorage() {
  try {
    return localStorage.getItem(CLAVE_AUTH) === "true";
  } catch {
    return false;
  }
}

function leerUsuarioDesdeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_USUARIO);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Lee el "padrón" de usuarios que ya se registraron (correo -> datos + contraseña)
function leerUsuariosRegistrados() {
  try {
    const data = localStorage.getItem(CLAVE_USUARIOS_REGISTRADOS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function guardarUsuariosRegistrados(usuarios) {
  try {
    localStorage.setItem(CLAVE_USUARIOS_REGISTRADOS, JSON.stringify(usuarios));
  } catch {
    // Si localStorage falla, simplemente no persistimos (no rompe la sesión en memoria)
  }
}

export function AuthProvider({ children }) {
  const [sesionActiva, setSesionActiva] = useState(leerSesionDesdeStorage);
  const [usuario, setUsuario] = useState(leerUsuarioDesdeStorage);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(leerUsuariosRegistrados);

  useEffect(() => {
    localStorage.setItem(CLAVE_AUTH, sesionActiva);
  }, [sesionActiva]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CLAVE_USUARIO);
    }
  }, [usuario]);

  useEffect(() => {
    guardarUsuariosRegistrados(usuariosRegistrados);
  }, [usuariosRegistrados]);

  // Registra una cuenta nueva. Si el correo ya existe, no permite duplicarla.
  const registrarse = useCallback(
    (datos) => {
      const correoNormalizado = (datos.correo || "").trim().toLowerCase();

      if (!correoNormalizado) {
        return { ok: false, mensaje: "Debes indicar un correo válido." };
      }

      if (usuariosRegistrados[correoNormalizado]) {
        return {
          ok: false,
          mensaje: "Ya existe una cuenta registrada con ese correo. Inicia sesión.",
        };
      }

      const usuarioConFoto = {
        ...datos,
        correo: correoNormalizado,
        foto: datos.foto || fotoMessi,
      };

      // Guardamos el usuario en el "padrón" de registrados (incluye la contraseña)
      setUsuariosRegistrados((prev) => ({
        ...prev,
        [correoNormalizado]: usuarioConFoto,
      }));

      // Al registrarse, iniciamos sesión automáticamente
      setUsuario(usuarioConFoto);
      setSesionActiva(true);

      return { ok: true };
    },
    [usuariosRegistrados]
  );

  // Solo permite iniciar sesión si el correo ya fue registrado y la contraseña coincide
  const iniciarSesion = useCallback(
    (correo, contrasena) => {
      const correoNormalizado = (correo || "").trim().toLowerCase();
      const cuenta = usuariosRegistrados[correoNormalizado];

      if (!cuenta) {
        return {
          ok: false,
          mensaje: "No existe una cuenta con ese correo. Regístrate primero.",
        };
      }

      if (cuenta.contrasena !== contrasena) {
        return { ok: false, mensaje: "Contraseña incorrecta." };
      }

      setUsuario({ ...cuenta, foto: cuenta.foto || fotoMessi });
      setSesionActiva(true);
      return { ok: true };
    },
    [usuariosRegistrados]
  );

  const cerrarSesion = useCallback(() => {
    // Elimina la cuenta del "padrón" de registrados para que sus datos
    // no puedan reutilizarse después de cerrar sesión.
    setUsuariosRegistrados((prev) => {
      if (!usuario?.correo) return prev;
      const correoNormalizado = usuario.correo.trim().toLowerCase();
      if (!(correoNormalizado in prev)) return prev;
      const actualizados = { ...prev };
      delete actualizados[correoNormalizado];
      return actualizados;
    });

    // Borramos los datos de sesión del localStorage
    localStorage.removeItem(CLAVE_AUTH);
    localStorage.removeItem(CLAVE_USUARIO);

    // Limpiamos el estado en React
    setSesionActiva(false);
    setUsuario(null);
  }, [usuario]);

  return (
    <AuthContext.Provider
      value={{ sesionActiva, usuario, registrarse, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
