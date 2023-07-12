import style from "./style.module.scss";
import classnames from "classnames";

type ButtonTypes = {
  children: React.ReactElement[] | React.ReactElement,
  className?: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>
};

const Button = ({ children, onClick, className }: ButtonTypes) => (
  <button 
    onClick={onClick} 
    className={classnames(style.button, className)}
  >
    {children}
  </button>
);

export default Button;