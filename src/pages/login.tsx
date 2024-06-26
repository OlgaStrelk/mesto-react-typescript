import { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../utils/consts";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // onLogin({ email, password });
  }
  return (
    <div className="page">
      <div className="page__container">
        <div className="auth-form">
          <form className="auth-form__form" onSubmit={handleSubmit}>
            <div className="auth-form__container">
              <h3 className="auth-form__title">Вход</h3>
              <label className="auth-form__input">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="auth-form__field"
                  placeholder="Email"
                  required
                  onChange={handleEmailChange}
                />
              </label>
              <label className="auth-form__input">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="auth-form__field"
                  placeholder="Пароль"
                  required
                  onChange={handlePasswordChange}
                />
              </label>
            </div>
            <button className="auth-form__button" type="submit">
              Войти
            </button>
            <p className="auth-form__text">
              "Вы — новый пользователь?"
              <Link className="auth-form__link" to={PATHS.register}>
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
