import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const CLAVE_TEMA = "tema";

function leerTemaDesdeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_TEMA);
    return data === "oscuro" || data === "claro" ? data : "claro";
  } catch {
    return "claro";
  }
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(leerTemaDesdeStorage);

  useEffect(() => {
    localStorage.setItem(CLAVE_TEMA, tema);
    document.documentElement.classList.toggle("dark", tema === "oscuro");
  }, [tema]);

  const cambiarTema = () => {
    setTema((prev) => (prev === "claro" ? "oscuro" : "claro"));
  };

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
