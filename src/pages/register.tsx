import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../utils/consts";

function RegisterPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // onRegister({ email, password });
  }
  return (
    <div className="page">
      <div className="page__container">
        <div className="auth-form">
          <form className="auth-form__form" onSubmit={handleSubmit}>
            <div className="auth-form__container">
              <h3 className="auth-form__title">Регистрация</h3>
              <label className="auth-form__input">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="auth-form__field"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  required
                />
              </label>
              <label className="auth-form__input">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="auth-form__field"
                  placeholder="Пароль"
                  onChange={handlePasswordChange}
                  required
                />
              </label>
            </div>
            <div className="auth-form__container">
              <button className="auth-form__button" type="submit">
                Зарегистрироваться
              </button>
              <p className="auth-form__text">
                Уже зарегистрированы?
                <Link className="auth-form__link" to={PATHS.login}>
                  Войти
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
