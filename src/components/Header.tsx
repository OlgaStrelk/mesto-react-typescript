import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../utils/consts";
import { useAppSelector } from "../hooks";

function Header({ onSignOut }) {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const { _id: email } = useAppSelector((state) => state.user.user);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }
  const { pathname } = useLocation();
  const { home, register } = PATHS;

  const isHome = pathname === home;
  const headerClass = `header  ${isMenuOpen ? "header_menu-open" : ""} 
    ${isHome ? "header_page-main" : ""}`;
  return (
    <header className={headerClass}>
      <div className="header__logo"></div>
      {isHome ? (
        <>
          <button
            className="header__burger"
            type="button"
            aria-label="меню"
            onClick={toggleMenu}
          ></button>
          <div className="header__container">
            <p className="header__user">{email}</p>
            <button className="header__logout" onClick={onSignOut}>
              Выйти
            </button>
          </div>
        </>
      ) : pathname === register ? (
        <Link className="header__auth-link" to={PATHS.login}>
          Войти
        </Link>
      ) : (
        <Link className="header__auth-link" to="sign-up">
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
