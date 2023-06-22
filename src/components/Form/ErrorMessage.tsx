import style from "./style.module.scss";
import classnames from "classnames";

type ErrorMessageTypes = {
  error: string
};

const ErrorMessage = ({ error }: ErrorMessageTypes) => Boolean(error) ? (
  <span className={classnames(style.errorMessage)}>{error}</span>
) : null;

export default ErrorMessage;