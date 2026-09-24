import Layout from './Components/layout/layout';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Inicio } from './Pages/Inicio/Inicio';
import { Contacto } from './Pages/Contacto/Contacto';
import { Productos } from './Pages/Catalogo/Productos';
import { Carrito } from './Pages/Carrito/Carrito';
import { Perfil } from './Pages/Perfil/Perfil';
import Escenario from './Pages/Escenario/Escenario';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/Escenario" element={<Escenario />} />
              <Route path="/Contacto" element={<Contacto />} />
              <Route path="/Catalogo" element={<Productos />} />
              <Route path="/Carrito" element={<Carrito />} />
              <Route path="/Perfil" element={<Perfil />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
