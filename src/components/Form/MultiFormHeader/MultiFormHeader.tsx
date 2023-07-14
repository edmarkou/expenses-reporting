import style from "./style.module.scss";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "src/components/Icons";

type MultiFormHeaderAttributes = {
  showButtons: boolean,
  buttons: React.ReactElement[] | React.ReactElement;
}

const MultiFormHeader = ({ showButtons, buttons }: MultiFormHeaderAttributes) => {
  return (
    <header className={classnames(style.headerContainer)}>
      <Link to="/">
        <ArrowLeftIcon/>
        <h4>New request</h4>
      </Link>
      {showButtons && (
        <div className={classnames(style.multiFormHeaderButtons)}>
          {buttons}
        </div>
      )}
    </header>
  )
};

export default MultiFormHeader;