import React from "react";
import './filter.css';
const FilterDropdown = ({ filter, setFilter }) => {
  const options = ["All", "MCQ", "ANAGRAM", "READ_ALONG"];

  return (
    <div className="filter-dropdown">
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
