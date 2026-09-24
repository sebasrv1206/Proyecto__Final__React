import { Link } from "react-router-dom";
import HeroImg from "../../assets/images1.jfif";
import viteLogo from "../../assets/vitejs.svg";
import tailwindLogo from "../../assets/tailwind.svg";
import reactRouterLogo from "../../assets/react-router.svg";
import reactLogo from "../../assets/logo-react.svg";

export const Inicio = () => {
  const tecnologias = [
    {
      nombre: "React",
      descripcion: "Biblioteca para construir interfaces de usuario.",
      imagen: reactLogo,
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      nombre: "Vite",
      descripcion: "Herramienta moderna para desarrollar aplicaciones frontend.",
      imagen: viteLogo,
      color: "bg-purple-100 text-purple-700",
    },
    {
      nombre: "Tailwind CSS",
      descripcion: "Framework CSS basado en clases de utilidad.",
      imagen: tailwindLogo,
      color: "bg-sky-100 text-sky-700",
    },
    {
      nombre: "React Router",
      descripcion: "Librería para gestionar la navegación de la aplicación.",
      imagen: reactRouterLogo,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const aprendizaje = [
    {
      titulo: "Componentes",
      texto: "Aprenderemos a dividir nuestra aplicación en componentes reutilizables.",
    },
    {
      titulo: "Navegación",
      texto: "Utilizaremos React Router para crear diferentes páginas dentro de nuestra aplicación.",
    },
    {
      titulo: "APIs",
      texto: "Aprenderemos a consumir información desde servicios externos mediante APIs.",
    },
    {
      titulo: "Tailwind CSS",
      texto: "Construiremos interfaces modernas utilizando clases de utilidad.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <section className="bg-slate-900 text-white relative overflow-hidden py-16 md:py-24">
  <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
    
    {/* Avatar/Imagen circular pequeña centrada arriba */}
    <div className="relative mb-8 group">
      {/* Resplandor suave detras del circulo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300"></div>
      
      <img 
        src={HeroImg} 
        alt="React705 Ilustración Principal" 
        className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-slate-800 shadow-2xl" 
      />
    </div>

    {/* Título Principal */}
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
      ¡Bienvenidos a <span className="text-cyan-400">React705</span>!
    </h1>

    {/* Párrafo destacado */}
    <p className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl leading-relaxed">
      Un espacio creado para aprender a desarrollar aplicaciones web modernas utilizando <span className="text-white font-semibold">React</span> y <span className="text-white font-semibold">Vite</span>.
    </p>

    {/* Párrafo secundario descriptivo */}
    <p className="text-slate-400 text-sm md:text-base mb-8 max-w-2xl leading-relaxed">
      Exploramos componentes, navegación, consumo de APIs, manejo de estados y estilos del ecosistema React. Descubre nuestras secciones de entrenamiento, catálogo y contacto.
    </p>

    {/* Botón de acción centrado */}
    <Link
      to="/Catalogo"
      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
    >
      Conoce el Catálogo
    </Link>

  </div>
</section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-4">
          Tecnologías utilizadas
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
          Este proyecto integra diferentes tecnologías y librerías utilizadas actualmente en el desarrollo frontend.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologias.map((tecnologia) => (
            <div
              key={tecnologia.nombre}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700"
            >
              <div
                className={`h-16 w-16 mx-auto flex items-center justify-center rounded-full text-3xl mb-5 p-3 ${tecnologia.color}`}
              >
                <img 
                  src={tecnologia.imagen} 
                  alt={`Logo de ${tecnologia.nombre}`} 
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                {tecnologia.nombre}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {tecnologia.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 dark:bg-slate-800/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">
            ¿Qué aprenderemos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aprendizaje.map((item) => (
              <div
                key={item.titulo}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-slate-100">{item.titulo}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 text-center py-8 border-t border-slate-800">
        <p>React705 · Aprendiendo desarrollo web moderno</p>
      </footer>
    </main>
  );
};

export default Inicio;