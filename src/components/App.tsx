import { Route, Routes } from "react-router-dom";
import "../index.css";

import { PATHS } from "../utils/consts";
import { OnlyAuth, OnlyUnAuth } from "./ProtectedRoute";
import Home from "../pages/home";
import { useEffect } from "react";
import PageNotFound from "./PageNotFound";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../store/slices/userSlice";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import Header from "./Header";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
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
    </div>
  );
}

export default App;
