import style from "./style.module.scss";
import classnames from "classnames";

type TableContainerAttributes = {
  children: React.ReactElement[] | React.ReactElement,
};

const TableContainer = ({ children }: TableContainerAttributes) => (
  <div className={classnames(style.tableContainer)}>
    {children}
  </div>
);

export default TableContainer;