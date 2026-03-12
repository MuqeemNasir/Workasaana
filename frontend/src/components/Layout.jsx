import { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import UserProfile from "./common/UserProfile";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex min-vh-100 bg-light">
        
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div
          className="layout-content d-flex flex-column min-vh-100">
          <div className="d-md-none bg-white border-bottom p-3 d-flex justify-content-between align-items-center shadow-sm sticky-top z-3">
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-light border text-primary p-2 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40 }}
                onClick={() => setIsSidebarOpen(true)}
              >
                <FaBars size={18} />
              </button>
              <span
                className="fw-bold fs-5 text-dark"
                style={{ letterSpacing: "-0.5px" }}
              >
                Workasana
              </span>
            </div>
            <UserProfile />
          </div>

          <div className="p-2 p-md-4 flex-grow-1">{children}</div>
        </div>
      </div>
  );
};

export default Layout;
