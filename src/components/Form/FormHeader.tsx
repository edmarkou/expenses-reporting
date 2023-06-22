import style from "./style.module.scss";
import classnames from "classnames";

type FormHeaderTypes = {
  text: string
};

const FormHeader = ({ text }: FormHeaderTypes) => (
  <h2 className={classnames(style.formTitle)}>{text}</h2>
);

export default FormHeader;