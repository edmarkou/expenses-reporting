import React from "react";
import style from "./style.module.scss";

type FormAttributes = {
  children: React.ReactElement[],
  onSubmit: React.FormEventHandler<HTMLFormElement>
};

const Form = ({ children, ...rest }: FormAttributes) => (
  <form {...rest} className={style.form}>
    <fieldset className={style.formFieldset}>{children}</fieldset>
  </form>
);

export default Form;