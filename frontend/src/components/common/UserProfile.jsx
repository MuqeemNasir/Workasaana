import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { FaChevronDown, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { getInitials } from "../../utils/formatters";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setIsOpen(false)
        }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  if (!user) return null;

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div
        className="d-flex align-items-center gap-2 cursor-pointer bg-white py-1 px-2 rounded-pill shadow-sm border"
        style={{ cursor: "pointer", transition: 'all 0.2s' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div title={user.name} className="d-flex align-items-center justify-content-center rounded-circle text-white shadow-sm" style={{width: '32px', height: '32px', fontSize: '12px', fontWeight: 'bold', background: 'linear-gradient(135deg, #6366f1, #a855f7)'}}>
          {getInitials(user.name)}
        </div>
        <div className="d-none d-md-block text-start me-1">
          <div
            className="fw-bold text-dark"
            style={{ fontSize: "0.85rem", lineHeight: "1.2" }}
          >
            {user?.name?.split(" ")[0]}
          </div>
        </div>
        <FaChevronDown className="text-muted ms-1" size={10} />
      </div>

      {isOpen && (
        <div
          className="position-absolute end-0 mt-2 bg-white shadow-lg rounded-4 p-2 border"
          style={{ minWidth: "220px", zIndex: 1000, animation: 'fadeIn o.2s' }}
        >
          <div className="px-3 py-2 border-bottom mb-2 bg-light rounded-top-3">
            <p className="mb-0 fw-bold text-dark small">{user?.name}</p>
            <p className="mb-0 text-muted extra-small text-truncate">{user?.email}</p>
          </div>

          <button className="btn btn-sm btn-white w-100 text-start d-flex align-items-center gap-2 py-2 px-3 mb-1 text-secondary rounded-3 hover-bg-light">
            <FaUser size={14} /> Profile
          </button>

          <Link to="/settings" className="btn btn-sm btn-white w-100 text-start d-flex align-items-center gap-3 py-2 px-3 mb-1 text-secondary rounded-3 hover-bg-light text-decoration-none">
            <FaCog size={14} /> Settings
          </Link>

          <div className="border-top my-1"></div>

          <button
            className="btn btn-sm btn-white w-100 text-start d-flex align-items-center gap-3 py-2 px-3 text-danger rounded-3 hover-bg-danger-light"
            onClick={logout}
          >
            <FaSignOutAlt size={14  } /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
