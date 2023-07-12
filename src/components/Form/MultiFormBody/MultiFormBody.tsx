import style from "./style.module.scss";
import classnames from "classnames";

type MultiFormBodyProps = { 
  children: React.ReactElement[] | React.ReactElement; 
}

const MultiFormBody = ({ children }: MultiFormBodyProps) => {
  return (
    <div className={classnames(style.multiFormBody)}>
      {children}
    </div>
  )
};

export default MultiFormBody;