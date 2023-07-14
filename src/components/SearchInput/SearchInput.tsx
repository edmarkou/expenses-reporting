import style from "./style.module.scss";
import classnames from "classnames";
import searchIcon from "src/assets/search-icon.png";

const SearchInput = () => (
  <div className={classnames(style.searchInputContainer)}>
    <img className={classnames(style.searchIcon)} src={searchIcon} alt="search"/> 
    <input placeholder="Search"/>
  </div>
);

export default SearchInput;