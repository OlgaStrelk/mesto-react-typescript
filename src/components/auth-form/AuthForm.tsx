import { useState } from "react";
import Input from "../Input";

function AuthForm({ handleSubmit, children, title, button }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     onRegister({ email, password });
  //   }

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__container">
          <h3 className="auth-form__title">{title}</h3>
          <Input
            handleChange={handleEmailChange}
            input={{
              type: "email",
              name: "email",
              id: "email",
              placeholder: "Email",
            }}
          />
          <Input
            handleChange={handlePasswordChange}
            input={{
              type: "password",
              name: "password",
              id: "password",
              placeholder: "Пароль",
            }}
          />
        </div>
        <button className="auth-form__button" type="submit">
          {button}
        </button>
        {children}
      </form>
    </div>
  );
}

export default AuthForm;
