import { forwardRef, useRef } from "react";

const FormInput = forwardRef(
  ({ type, placeholder, onBlur, onChange, name }, ref) => {
    return (
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
        />
    );
}
);
export default FormInput;
