import { useCallback, useState } from "react";
import { ArrowDownIcon } from "src/components/Icons";
import style from "./style.module.scss";
import classnames from "classnames";

type MultiFormBodyAttributes = { 
  children: React.ReactElement[] | React.ReactElement; 
  text?: string;
  collapseEnabled?: boolean
}

const MultiFormBody = ({ children, text, collapseEnabled }: MultiFormBodyAttributes) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onCollapse = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed])

  return (
    <div 
      className={classnames({
        [style.multiFormBody]: true,
        [style.multiFormBodyMinimized]: isCollapsed
      })}
    >
      {collapseEnabled && 
        <div className={classnames(style.multiFormBodyCollapse)}>
          {text && <h1>{text}</h1>}
          <button onClick={onCollapse} className={classnames(style.collapseButton)}>
            <ArrowDownIcon className={isCollapsed ? style.collapsedArrow : style.unCollapsedArrow}/>
          </button>
        </div>
      }
      {children}
    </div>
  )
};

export default MultiFormBody;