import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

const SearchSelect = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      onSelect([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter(
      (selected) => selected !== option
    );
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowAllOptions(term === ""); // Show all options when the search term is empty
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full xl:w-1/2 mb-4.5">
      <div className="mb-3">
        <input
          type="search"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          id="exampleSearch"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="line-clamp-3">
        {filteredOptions.map((option) => (
          <li key={option} onClick={() => handleSelectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
      <div>
        <strong>Selected Skills:</strong>

        {selectedOptions.map((option) => (
          <span key={option} className="badge badge-outline ml-0 m-4">
            {option}
            <button onClick={() => handleRemoveOption(option)}>
              <HiOutlineX />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchSelect;
