import React, { ChangeEvent, InputHTMLAttributes } from "react";
import style from './style.module.scss';
import classnames from "classnames";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type RadioInputAttributes = InputHTMLAttributes<HTMLInputElement> & {
  value: string,
  options: RadioOption[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const Radio: React.FC<RadioInputAttributes> = ({ options, value, id, ...rest }) => {
  return (
    <div className={classnames("row", style.radioInputContainer)}>
      {options.map((option, i) => (
        <label key={option.value} className={classnames(style.radioInputLabel)}>
          <input
            {...rest}
            id={`${id}-${i}`}
            disabled={option.disabled}
            type="radio"
            value={option.value}
            checked={value === option.value}
            aria-checked={value === option.value}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Radio;