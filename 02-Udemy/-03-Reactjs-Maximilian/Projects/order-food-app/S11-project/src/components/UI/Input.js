import classes from "./Input.module.css";
import React from "react";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* // {...props.input}  to make sure that all the input is passing into it */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
