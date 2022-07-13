import React, { useEffect } from "react";

// const ButtonFunction = React.forwardRef({style, className, ...props}, ref) => {
//   return ({
//     <div style={{ ...style}} className="gridbox" ref={ref}>
//       {/* Some other content */}
//     </div>
//   );
// };

// Custom Component in grid
//https://github.com/react-grid-layout/react-grid-layout#custom-child-components-and-draggable-handles
//https://github.com/react-grid-layout/react-grid-layout/issues/1241

function ButtonFunction({
  style,
  className,
  my_key,
  my_row,
  my_col,
  isSelected,
  isInHighlight,
  // onClickFunction,
  value,
  // handleFocusAwayFunction,
  value_correct,
  value_start,
  showSolution,
}) {
  // function renderValue() {
  //   // if the start value is occupied, display startvalue:
  //   // else if flag for showSolution is true, then display the correct value.
  //   // else display user set value
  //   if (value_start != null) {
  //     return value_start;
  //   } else if (showSolution == true) {
  //     return value_correct;
  //   } else {
  //     return value;
  //   }
  // }

  // if value_start is not null, "gridbox-locked" otherwise "gridbox"
  // if showSolution == true then "gridbox-solution"
  // function setClassName() {
  //   if (value_start !== null) {
  //     return "gridbox-locked";
  //   } else if (showSolution === true) {
  //     if (value == value_correct) {
  //       return "gridbox-solutionCorrect";
  //     } else {
  //       return "gridbox-solutionNotCorrect";
  //     }
  //   } else if (isSelected == true) {
  //     return "gridbox";
  //   } else if (isInHighlight == true) {
  //     return "gridbox-isInHighlight";
  //   } else {
  //     return "gridbox";
  //   }
  // }

  return (
    <button
      className="gridbox"
      // className={setClassName()}
      onFocus={() => {
        //      onClickFunction(my_key);
      }}
      onClick={() => {
        //    onClickFunction(my_key);
      }}
      onBlur={() => {
        //    handleFocusAwayFunction(my_key);
      }}
    >
      {value_start}
      {/* {renderValue()} */}
    </button>
  );
}

export default ButtonFunction;
