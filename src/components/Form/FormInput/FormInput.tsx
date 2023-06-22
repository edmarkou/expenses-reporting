import React, { ChangeEvent, useMemo } from "react";
import style from "./style.module.scss";
import classnames from "classnames";

type FormInputTypes = {
  className?: string, 
  label?: string, 
  id?: string, 
  type?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({ className, label, id, type = "text", ...rest }: FormInputTypes) => {
  const isButton = useMemo(() => (type === "button" || type === "submit"), [type]);

  const inputLabel = useMemo(
    () => (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        {!isButton && <fieldset>
          <legend>{label}</legend>
        </fieldset>}
      </>
    ),
    [id, label, isButton]
  );

  return (
    <div className={classnames(style.inputContainer)}>
      <input
        className={classnames({
          [style.button]: isButton,
          [style.input]: !isButton
        })}
        id={id}
        type={type}
        {...rest}
      />
      {inputLabel}
    </div>
  );
};

export default FormInput;