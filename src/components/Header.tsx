import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../utils/consts";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUserId, signOut } from "../store/slices/userSlice";

function Header() {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const email = useAppSelector(selectUserId);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }
  const { pathname } = useLocation();
  const { home, register, login } = PATHS;

  const isHome = pathname === home;
  const headerClass = `header  ${isMenuOpen ? "header_menu-open" : ""} 
    ${isHome ? "header_page-main" : ""}`;

  const onSignOut = () => {
    dispatch(signOut());
    localStorage.removeItem("jwt");
  };

  return (
    <header className={headerClass}>
      <Link to={home}>
        <div className="header__logo"></div>
      </Link>
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
        <Link className="header__auth-link" to={login}>
          Войти
        </Link>
      ) : (
        <Link className="header__auth-link" to={register}>
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
