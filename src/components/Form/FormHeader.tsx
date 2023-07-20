import style from "./style.module.scss";
import classnames from "classnames";

type FormHeaderAttributes = {
  text: string
};

const FormHeader = ({ text }: FormHeaderAttributes) => (
  <h2 className={classnames(style.formTitle)}>{text}</h2>
);

export default FormHeader;