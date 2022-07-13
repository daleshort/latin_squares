import React, { useEffect } from "react";

function ButtonFunction({
  style,
  className,
  my_key,
  my_row,
  my_col,
  isSelected,
  isInHighlight,
  onClickFunction,
  value,
  handleFocusAwayFunction,
  value_correct,
  value_start,
  showSolution,
  loadCount,
}) {
  function renderValue() {
    if (value_start != null) {
      return value_start;
    } else if (showSolution == true) {
      return value_correct;
    } else {
      return value;
    }
  }

  function setClassName() {
    if (value_start !== null) {
      return "gridbox-locked";
    } else if (showSolution === true) {
      if (value == value_correct) {
        return "gridbox-solutionCorrect";
      } else {
        return "gridbox-solutionNotCorrect";
      }
    } else if (isSelected == true) {
      return "gridbox";
    } else if (isInHighlight == true) {
      return "gridbox-isInHighlight";
    } else {
      return "gridbox";
    }
  }

  return (
    <button
      className={setClassName()}
      onFocus={() => {
        onClickFunction(my_key);
      }}
      onClick={() => {
        onClickFunction(my_key);
      }}
      onBlur={() => {
        handleFocusAwayFunction(my_key);
      }}
      key={my_key + "buttonBase" + { loadCount }}
    >
      {renderValue()}
    </button>
  );
}

export default ButtonFunction;
