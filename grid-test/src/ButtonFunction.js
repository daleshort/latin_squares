import React, { useEffect, useState } from "react";

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

const ButtonFunction = React.forwardRef(
  (
    {
      style,
      className,
      my_key,
      my_row,
      my_col,
      isSelected,
      onClickFunction,
      value,
      handleFocusAwayFunction,
      value_correct,
      value_start,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={{ ...style }}
        className={value_start ? "gridbox-locked" : "gridbox"}
        onClick={() => {
          onClickFunction(my_key);
          //     handleFocusAwayFunction(my_key);
        }}
        onBlur={() => {
          // onClickFunction(my_key);
          console.log("focus lost in component");
          handleFocusAwayFunction(my_key);
        }}
        ref={ref}
      >
        {value_start ? value_start : value}
      </button>
    );
  }
);

export default ButtonFunction;
