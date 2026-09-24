import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const avatar = avatarRef.current.value.trim();

    if (!avatar) {
      setError("Debes introducir un enlace.");
      return;
    }

    if (!avatarRef.current.validity.valid) {
      setError("Introduce un enlace válido.");
      return;
    }

    setError("");

    handleUpdateAvatar({
      avatar,
    });
  }

  function handleInputChange() {
    setError("");
  }

  return (
    <form
      className="popup__form popup__form_type_avatar"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        name="avatar"
        id="avatar-input"
        className={`popup__input popup__input_type_avatar ${
          error ? "popup__input_type_error" : ""
        }`}
        type="url"
        required
        placeholder="Enlace de la imagen"
        ref={avatarRef}
        onChange={handleInputChange}
      />

      <span className="popup__error" id="avatar-input-error">
        {error}
      </span>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}