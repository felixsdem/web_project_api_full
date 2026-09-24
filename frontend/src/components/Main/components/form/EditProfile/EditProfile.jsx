import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  function validateForm() {
    const newErrors = {
      name: "",
      description: "",
    };

    if (!name.trim()) {
      newErrors.name = "Debes introducir un nombre.";
    } else if (name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    } else if (name.trim().length > 40) {
      newErrors.name = "El nombre no puede superar los 40 caracteres.";
    }

    if (!description.trim()) {
      newErrors.description = "Debes introducir una descripción.";
    } else if (description.trim().length < 2) {
      newErrors.description =
        "La descripción debe tener al menos 2 caracteres.";
    } else if (description.trim().length > 200) {
      newErrors.description =
        "La descripción no puede superar los 200 caracteres.";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.description;
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      name: "",
    }));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      description: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleUpdateUser({
      name: name.trim(),
      description: description.trim(),
    });
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        name="name"
        id="name-input"
        className={`popup__input popup__input_type_name ${
          errors.name ? "popup__input_type_error" : ""
        }`}
        type="text"
        required
        minLength="2"
        maxLength="40"
        placeholder="Nombre"
        value={name}
        onChange={handleNameChange}
      />

      <span className="popup__error" id="name-input-error">
        {errors.name}
      </span>

      <input
        name="description"
        id="about-input"
        className={`popup__input popup__input_type_description ${
          errors.description ? "popup__input_type_error" : ""
        }`}
        type="text"
        required
        minLength="2"
        maxLength="200"
        placeholder="Acerca de"
        value={description}
        onChange={handleDescriptionChange}
      />

      <span className="popup__error" id="about-input-error">
        {errors.description}
      </span>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}