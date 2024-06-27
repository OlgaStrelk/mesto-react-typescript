import { useState } from "react";
import { PATHS } from "../utils/consts";
import { IAuth } from "../utils/types";
import { authorize } from "../utils/authApi";
import Redirect from "../components/auth-form/redirect/redirect";
import AuthForm from "../components/auth-form/auth-form";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tooltipStatus, setTooltipStatus] = useState({
    text: "",
    iconType: "",
  });
  const onLogin = ({ email, password }: IAuth) => {
    authorize(email, password).catch(() => {
      setTooltipStatus({
        text: "Что-то пошло не так! Попробуйте ещё раз.",
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
    onLogin({ email, password });
  }
  return (
    <AuthForm handleSubmit={handleSubmit} title="Вход" button="Войти">
      <Redirect
        text="Вы — новый пользователь?"
        link={PATHS.register}
        title="Зарегистрироваться"
      />
    </AuthForm>
  );
}

export default LoginPage;
