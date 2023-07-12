import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import classnames from "classnames";
import doggo from "../../assets/user-icon.jpg";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const [shouldShowDropDown, setShouldShowDropDown] = useState(false);
  const { userData, logout } = useAuth();
  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShouldShowDropDown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);

  const loadMenu = useCallback(() => {
    if (userData) {
      return (
        <button onClick={() => logout()}>Log out</button>
      )
    } else {
      return [
        <Link key="login" to="/login">Log In</Link>,
        <Link key="signup" to="/signup">Sign Up</Link>
      ]
    }
  }, [userData, logout])

  return (
    <header className={classnames("row", style.headerContainer)}>
      <h4>Expenses Reporting</h4>
      <div className={classnames(style.headerIconContainer)}>
        <div className={classnames(style.headerIconRow)}>
          <div/><div/><div/>
        </div>
        <div className={classnames(style.headerIconRow)}>
          <div/><div/><div/>
        </div>
        <div className={classnames(style.headerIconRow)}>
          <div/><div/><div/>
        </div>
      </div>
      <div ref={wrapperRef} className={classnames(style.userContainer)}>
        <button  
          className={classnames(style.userButton)} 
          onClick={() => setShouldShowDropDown(!shouldShowDropDown)}
        >
          <img src={doggo} alt="user icon"/>
          <div className={classnames(style.arrowIcon)} />
        </button>
        <div 
          className={classnames({
            [style.dropdownMenu]: true, 
            [style.dropdownMenuOpen]: shouldShowDropDown
          })}
        >
          {loadMenu()}
        </div>
      </div>
    </header>
  )
};

export default Header;