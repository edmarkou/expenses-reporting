import style from "./style.module.scss";
import classnames from "classnames";

type PlusIconAttributes = {
  className?: string
}

const PlusIcon = ({ className }: PlusIconAttributes) => (
  <div className={classnames(style.plusIcon, className)} />
);

export default PlusIcon;