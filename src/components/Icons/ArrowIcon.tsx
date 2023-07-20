import style from "./style.module.scss";
import classnames from "classnames";

type ArrowIconAttributes = {
  className?: string
}

const ArrowLeftIcon = ({ className }: ArrowIconAttributes) => (
  <div className={classnames(style.arrowIcon, style.arrowLeft, className)} />
);
const ArrowDownIcon = ({ className }: ArrowIconAttributes) => (
  <div className={classnames(style.arrowIcon, style.arrowDown, className)} />
);

export { ArrowLeftIcon, ArrowDownIcon };