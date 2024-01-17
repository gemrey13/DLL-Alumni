import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

const SearchSelect = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customSkill, setCustomSkill] = useState("");

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
  };

  const handleCustomSkillChange = (e) => {
    setCustomSkill(e.target.value);
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() !== "" && !selectedOptions.includes(customSkill)) {
      setSelectedOptions([...selectedOptions, customSkill]);
      onSelect([...selectedOptions, customSkill]);
      setCustomSkill("");
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full xl:w-1/2 mb-4.5">
      <div className="">
        <label className="mb-2.5 block text-black dark:text-white">
          Skills <span className="text-meta-1">*</span>
        </label>
        <input
          type="search"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          id="exampleSearch"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="line-clamp-3 bg-slate-300 text-graydark px-5">
        {filteredOptions.map((option) => (
          <li
            key={option}
            onClick={() => handleSelectOption(option)}
            className="py-1">
            {option}
          </li>
        ))}
      </ul>
      <div>
        <strong>Selected Skills:</strong>
        {selectedOptions.map((option) => (
          <span key={option} className="badge badge-outline m-2">
            {option}
            <div onClick={() => handleRemoveOption(option)}>
              <HiOutlineX />
            </div>
          </span>
        ))}
      </div>
      <div className="mt-3">
        <label className="block text-black dark:text-white mb-1">
          Add Skill:
        </label>
        <div className="flex">
          <input
            type="text"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter custom skill..."
            value={customSkill}
            onChange={handleCustomSkillChange}
            onKeyDown={(e) => e.key === "Enter" && handleAddCustomSkill()}
          />
          <div
            className="btn ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
            onClick={handleAddCustomSkill}>
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSelect;
