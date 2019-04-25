import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const DropDown = () => {
    return (
      <label htmlFor={id}>
        Animal
        <select
          id={id}
          value={state}
          onChange={e => setState(e.target.value)}
          onBlur={e => setState(e.target.value)}
        >
          <option />
          {options.map(selectOption => (
            <option key={selectOption} value={selectOption}>
              {selectOption}
            </option>
          ))}
        </select>
      </label>
    );
  };
  return [state, DropDown, setState];
};

export default useDropdown;
