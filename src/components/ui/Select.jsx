import { Check, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ label, value, options, onChange, customText = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="flex  text-sm items-center gap-x-2 justify-between w-full px-4 py-2 text-white outline outline-[#45474E] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <span>
          {label}{" "}
          <span className="text-gray-400">
            {value}
            {customText}
          </span>
        </span>

        <ChevronDown
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 overflow-y-auto border border-[#45474E]  rounded-md shadow-lg max-h-40 bg-[#37393F]">
          <ul className="py-1 text-white">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-600 flex gap-x-2 items-center ${
                  value === option.value ? "bg-gray-600" : ""
                }`}
              >
                {option.label}
                {value === option.value && (
                  <Check size={15} className="text-white" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
