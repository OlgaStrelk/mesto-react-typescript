import { Route, Routes, useNavigate } from "react-router-dom";
import "../index.css";

import { PATHS } from "../utils/consts";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import Home from "../pages/home";
import { authorize, register } from "../utils/authApi";
import { IAuth } from "../utils/types";
import { useEffect, useState } from "react";
import PageNotFound from "./PageNotFound";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../store/slices/userSlice";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tooltipStatus, setTooltipStatus] = useState({
    text: "",
    iconType: "",
  });
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
  const onRegister = ({ email, password }: IAuth) => {
    register(email, password)
      .then(() => {
        navigate(PATHS.login);
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

  const onLogin = ({ email, password }: IAuth) => {
    authorize(email, password)
      .then(() => {
        navigate(PATHS.home);
      })
      .catch(() => {
        setTooltipStatus({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          iconType: "error",
        });
      });
  };
  return (
    <Routes>
      <Route path={PATHS.home} element={<OnlyAuth component={<Home />} />} />

      <Route
        path={PATHS.register}
        element={<OnlyUnAuth component={<RegisterPage />} />}
      />

      <Route
        path={PATHS.login}
        element={<OnlyUnAuth component={<LoginPage />} />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
