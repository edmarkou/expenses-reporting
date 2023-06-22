import React from "react";
import style from "./style.module.scss";

type FormTypes = {
  children: React.ReactElement[],
  onSubmit: (e: any) => void
};

const Form = ({ children, ...rest }: FormTypes) => (
  <form {...rest} className={style.form}>
    <fieldset className={style.formFieldset}>{children}</fieldset>
  </form>
);

export default Form;