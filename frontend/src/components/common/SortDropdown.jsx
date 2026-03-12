import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SortDropdown = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("Newest First");

  const handleSort = (type, text) => {
    onSort(type);
    setLabel(text);
    setIsOpen(false);
  };

  return (
    <div className="position-relative">
      <button
        className="btn btn-white bg-white border rounded-pill shadow-sm d-flex align-items-center gap-2 px-3 py-1"
        style={{ fontSize: "0.85rem" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-muted">Sort By:</span>
        <span className="fw-bold text-dark">{label}</span>
        <FaChevronDown size={10} className="text-muted" />
      </button>

      {isOpen && (
        <div
          className="position-absolute end-0 mt-2 bg-white shadow-lg rounded-3 p-2 border z-3"
          style={{ minWidth: "180px" }}
        >
          <ul className="list-unstyled mb-0">
            <li>
              <button
                className="dropdown-item rounded-2 small py-2"
                onClick={() => handleSort("newest", "Newest First")}
              >
                Newest First
              </button>
            </li>
            <li>
              <button
                className="dropdown-item rounded-2 small py-2"
                onClick={() => handleSort("oldest", "Oldest First")}
              >
                Oldest First
              </button>
            </li>
            <li>
              <hr className="dropdown-divider my-1" />
            </li>
            <li>
              <button
                className="dropdown-item rounded-2 small py-2"
                onClick={() => handleSort("a-z", "Name (A-Z)")}
              >
                Name (A-Z)
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
