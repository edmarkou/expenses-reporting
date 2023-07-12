import style from "./style.module.scss";
import classnames from "classnames";

type ArrowIconProps = {
  className?: string
}

const ArrowLeftIcon = ({ className }: ArrowIconProps) => (
  <div className={classnames(style.arrowIcon, style.arrowLeft, className)} />
);
const ArrowDownIcon = ({ className }: ArrowIconProps) => (
  <div className={classnames(style.arrowIcon, style.arrowDown, className)} />
);

export { ArrowLeftIcon, ArrowDownIcon };