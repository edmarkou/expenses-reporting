import SearchInput from "src/components/SearchInput";
import style from "./style.module.scss";
import classnames from "classnames";

const TableHeader = () => (
  <div className={classnames(style.tableHeader)}>
    <div className={classnames(style.tabContainer)}>
      <div className={classnames(style.tab)}>
        <span>My tab</span>
      </div>
      <div 
        className={classnames({
          [style.tab]: true, 
          [style.tabActive]: true
        })}
      >
        <span>My tab</span>
      </div>
    </div>
    <div className={classnames(style.searchContainer)}>
      <SearchInput/>
    </div>
  </div>
);

export default TableHeader;