import style from "./style.module.scss";
import classnames from "classnames";

type ErrorMessageAttributes = {
  error: string
};

const ErrorMessage = ({ error }: ErrorMessageAttributes) => Boolean(error) ? (
  <div className={classnames(style.errorMessageContainer)}>
    <span className={classnames(style.errorMessage)}>{error}</span>
  </div>
) : null;

export default ErrorMessage;