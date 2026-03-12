import { FaSearch } from "react-icons/fa";

const SearchBox = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="position-relative w-100 search-box-wrapper">
      <FaSearch
        className="position-absolute text-muted"
        style={{
          top: "50%",
          left: "15px",
          transform: "translateY(-50%)",
          fontSize: "0.9rem",
        }}
      />
      <input
        type="text"
        className="form-control rounded-pill bg-white border-0 shadow-sm ps-5 w-100"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
