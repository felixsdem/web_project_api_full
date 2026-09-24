import { useContext } from "react";

import logo from "../../images/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({ onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header page__section">
      <img className="logo header__logo" alt="Around The U.S logo" src={logo} />

      <div className="header__user">
        <p className="header__email">{currentUser.email}</p>

        <button
          className="header__logout"
          type="button"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;