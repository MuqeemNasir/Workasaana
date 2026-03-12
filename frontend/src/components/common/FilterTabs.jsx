const FilterTabs = ({ options, selected, onSelect }) => {
  return (
    <div className="d-flex align-items-center gap-4">
      <button
        className={`btn p-0 border-0 fw-bold ${selected === "All" ? "text-primary" : "text-muted"}`}
        style={{
          fontSize: "0.9rem",
          borderBottom:
            selected === "All"
              ? "2px solid var(--primary-color)"
              : "2px solid transparent",
          borderRadius: 0,
          paddingBottom: "4px !important",
        }}
        onClick={() => onSelect("All")}
      >
        All
      </button>

      {options.map((option) => (
        <button
          key={option}
          className={`btn p-0 border-0 fw-bold ${selected === option ? "text-primary" : "text-muted"}`}
          style={{
            fontSize: "0.9rem",
            borderBottom:
              selected === option
                ? "2px solid var(--primary-color)"
                : "2px solid transparent",
            borderRadius: 0,
            paddingBottom: "4px !important",
          }}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
