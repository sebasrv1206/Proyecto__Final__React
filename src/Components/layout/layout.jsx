import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Cabecera from "./Cabecera.jsx";
import Navbar from "./Navbar.jsx";
import Login from "../Auth/login.jsx";
import PageContainer from "./PageContainer.jsx";

function Layout({ children }) {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <>
      <Toaster position="top-center" />
      <Cabecera setMostrarLogin={setMostrarLogin} />

      {mostrarLogin ? (
        <Login onClose={() => setMostrarLogin(false)} />
      ) : (
        <>
          <Navbar />
          <PageContainer>
            <main className="w-full text-center">{children}</main>
          </PageContainer>
        </>
      )}
    </>
  );
}

export default Layout; 