import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown, FaFilter } from "react-icons/fa";

const FilterDropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="position-relative d-inline-block" ref={dropdownRef}>
      <button
        type="button"
        className="btn btn-sm btn-light border bg-white d-flex align-items-center gap-2 shadow-sm text-secondary px-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter size={10} className={selected !== 'All' ? 'text-primary' : 'text-muted'} />
        <span className={`fw-semibold ${selected !== 'All' ? 'text-primary' : ''}`}>
          {selected === "All" ? 'Filter' : selected}
        </span>
        <FaChevronDown size={10} className="ms-1" />
      </button>

      {isOpen && (
        <div
          className="position-absolute bg-white shadow-lg rounded-3 p-2 mt-2 z-3 border"
          style={{ minWidth: "160px", left: 0 }}
        >
          <ul className="list-unstyled mb-0">
            <li>
              <button
                className={`btn btn-sm w-100 text-start d-flex justify-content-between align-items-center px-2 py-1 rounded-2 ${selected === "All" ? "bg-light text-primary fw-bold" : "text-dark bg-white"}`}
                onClick={() => handleSelect("All")}
                style={{ border: "none" }}
              >
                All
                {selected === "All" && <FaCheck size={10} />}
              </button>
            </li>

            <hr className="border-top my-1" />

            {options.map((option) => (
              <li key={option}>
                <button
                  className={`btn btn-sm w-100 text-start d-flex justify-content-between align-items-center px-2 py-1 rounded-2 ${selected === option ? "bg-light text-primary fw-bold" : "text-dark bg-white"}`}
                  onClick={() => handleSelect(option)}
                  style={{ border: "none" }}
                >
                  {option}
                  {selected === option && <FaCheck size={10} />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
