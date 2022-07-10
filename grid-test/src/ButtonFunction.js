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
      handleFocusAway,
      value_correct,
      value_start,
      ...props
    },
    ref
  ) => {
    // const [count, setCount] = useState(0);
    // function useHandleClick() {
    //   useEffect(() => {
    //     // console.log("click in button component");
    //     onClickFunction(parseInt(my_key));
    //   });
    // }

    const handleFocusAwayFunc = () => {
      handleFocusAway(parseInt(my_key));
    };

    return (
      <button
        style={{ ...style }}
        className={value_start ? "gridbox-locked" : "gridbox"}
        onClick={() => {
          onClickFunction(my_key);
        }}
        onBlur={handleFocusAwayFunc}
        ref={ref}
      >
        {value_start ? value_start : value}
      </button>
    );
    // return (
    //   <div style={{ ...style }} className="gridbox" ref={ref}>
    //     <Button className="gridbox" onClick={handleClick}>
    //       {my_col},{my_row}
    //     </Button>
    //   </div>
    // );
  }
);

export default ButtonFunction;
