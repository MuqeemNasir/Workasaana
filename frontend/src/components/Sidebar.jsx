import { NavLink } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import {FaChartPie, FaHome, FaProjectDiagram, FaSignOutAlt, FaUsers} from 'react-icons/fa'

const Sidebar = () => {
  const { logout } = useAuthStore();

  return (
    <div
      className="d-flex flex-column p-3 bg-white shadow h-100"
      style={{ minHeight: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <span className="fs-4 fw-bold text-primary">Workasana</span>
      </a>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to='/' className={({isActive}) => `nav-link ${isActive ? 'active' : 'link-dark'}`}>
            <FaHome className="me-2" /> Dashboard 
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/projects" className={({isActive}) => `nav-link ${isActive ? 'active' : 'link-dark'}`}>
            <FaProjectDiagram className="me-2" /> Projects
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/teams" className={({isActive}) => `nav-link ${isActive ? 'active' : 'link-dark'}`}>
            <FaUsers className="me-2" /> Teams
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/reports" className={({isActive}) => `nav-link ${isActive ? 'active' : 'link-dark'}`}>
            <FaChartPie className="me-2" /> Reports
          </NavLink>
        </li>
      </ul>

      <hr />

      <div className="dropdown">
        <button onClick={logout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
