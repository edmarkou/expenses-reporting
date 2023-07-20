import { ChangeEvent, InputHTMLAttributes, useMemo } from "react";
import style from "./style.module.scss";
import classnames from "classnames";

export type InputAttributes = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string,
  className?: string, 
  label?: string, 
  id?: string, 
  type?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value?: string
}

const FormInput = ({ containerClassName, className, label, id, type = "text", value, ...rest }: InputAttributes) => {
  const isButton = useMemo(() => (type === "button" || type === "submit"), [type]);
  const buttonProps = useMemo(() => {
    if (isButton) {
      let props = {} as any;
      if (value) props.value = value;
      return props;
    }
    return {};
  }, [isButton, value])

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
    <div className={classnames(style.inputContainer, containerClassName)}>
      <input
        className={classnames({
          [style.formButton]: isButton,
          [style.formInput]: !isButton,
          [className as string]: Boolean(className)
        })}
        id={id}
        type={type}
        {...buttonProps}
        {...rest}
      />
      {inputLabel}
    </div>
  );
};

export default FormInput;