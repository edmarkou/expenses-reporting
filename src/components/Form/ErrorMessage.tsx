import style from "./style.module.scss";
import classnames from "classnames";

type ErrorMessageTypes = {
  error: string
};

const ErrorMessage = ({ error }: ErrorMessageTypes) => Boolean(error) ? (
  <div className={classnames(style.errorMessageContainer)}>
    <span className={classnames(style.errorMessage)}>{error}</span>
  </div>
) : null;

export default ErrorMessage;