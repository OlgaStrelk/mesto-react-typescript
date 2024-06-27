import { Link } from "react-router-dom";
import { PATHS } from "../../../utils/consts";

function Redirect({ text, title, link }) {
  return (
    <p className="auth-form__text">
      {text}
      <Link className="auth-form__link" to={link}>
        {title}
      </Link>
    </p>
  );
}
export default Redirect;
