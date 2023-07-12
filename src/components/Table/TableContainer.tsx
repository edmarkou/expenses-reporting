import style from "./style.module.scss";
import classnames from "classnames";

type TableContainerTypes = {
  children: React.ReactElement[] | React.ReactElement,
};

const TableContainer = ({ children }: TableContainerTypes) => (
  <div className={classnames(style.tableContainer)}>
    {children}
  </div>
);

export default TableContainer;