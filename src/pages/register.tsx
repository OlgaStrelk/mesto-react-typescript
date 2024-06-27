import React, { useState } from "react";
import { PATHS } from "../utils/consts";
import { register } from "../utils/authApi";
import { IAuth } from "../utils/types";
import AuthForm from "../components/auth-form/AuthForm";
import Redirect from "../components/auth-form/redirect/Redirect";

function RegisterPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tooltipStatus, setTooltipStatus] = useState({
    text: "",
    iconType: "",
  });
  const onRegister = ({ email, password }: IAuth) => {
    register(email, password)
      .then(() => {
        setTooltipStatus({
          text: "Вы успешно зарегистрировались",
          iconType: "success",
        });
      })
      .catch(() => {
        setTooltipStatus({
          text: "Что-то пошло не так!  Попробуйте ещё раз.",
          iconType: "error",
        });
      });
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password });
  }
  return (
    <AuthForm handleSubmit={handleSubmit} title="Регистрация" button="Зарегистрироваться">
      <Redirect
        text="Уже зарегистрированы?"
        link={PATHS.login}
        title="Войти"
      />
    </AuthForm>
  );
}

export default RegisterPage;
