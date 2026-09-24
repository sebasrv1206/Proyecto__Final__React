import { NavLink } from 'react-router-dom';

const enlaces = [
  { to: '/', label: 'Inicio' },
  { to: '/Escenario', label: 'Diviértete' },
  { to: '/Catalogo', label: 'Catálogo' },
  { to: '/Contacto', label: 'Contáctame' },
];

function Navbar() {
  return (
    <nav className="flex justify-center pt-[10px] pb-[20px] px-0">
      <ul className="flex gap-[15px] list-none px-4 py-2 m-0 bg-[#0E0F15]/70 rounded-[30px] border border-[#FFB703]/30 backdrop-blur-[5px]">
        {enlaces.map((enlace) => (
          <li key={enlace.to}>
            <NavLink
              to={enlace.to}
              end={enlace.to === '/'}
              className={({ isActive }) =>
                `px-[22px] py-[8px] border border-transparent rounded-[20px] text-[#F0E6D2] font-semibold text-[13px] uppercase bg-transparent cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FFB703] text-[#0E0F15] shadow-[0_0_12px_rgba(255,183,3,0.5)] font-bold'
                    : 'hover:bg-[#FFB703] hover:text-[#0E0F15] hover:shadow-[0_0_12px_rgba(255,183,3,0.5)] hover:font-bold'
                }`
              }
            >
              {enlace.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;