import { useState } from "react";

export default function NewCard({ onAddCard }) {
  const [errors, setErrors] = useState({
    name: "",
    link: "",
  });

  function validateForm(form) {
    const nameInput = form.elements["card-name"];
    const linkInput = form.elements.link;

    const newErrors = {
      name: "",
      link: "",
    };

    if (!nameInput.value.trim()) {
      newErrors.name = "Debes introducir un título.";
    } else if (nameInput.value.length < 1) {
      newErrors.name = "El título debe tener al menos 1 carácter.";
    } else if (nameInput.value.length > 30) {
      newErrors.name = "El título no puede superar los 30 caracteres.";
    }

    if (!linkInput.value.trim()) {
      newErrors.link = "Debes introducir un enlace.";
    } else if (!linkInput.validity.valid) {
      newErrors.link = "Introduce un enlace válido.";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.link;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    if (!validateForm(form)) {
      return;
    }

    onAddCard({
      "card-name": form.elements["card-name"].value.trim(),
      url: form.elements.link.value.trim(),
    });
  }

  function handleInputChange(event) {
    const { name } = event.target;

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name === "card-name" ? "name" : "link"]: "",
    }));
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className={`popup__input popup__input_type_card-name ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          onChange={handleInputChange}
        />

        <span className="popup__error" id="card-name-error">
          {errors.name}
        </span>
      </label>

      <label className="popup__field">
        <input
          className={`popup__input popup__input_type_url ${
            errors.link ? "popup__input_type_error" : ""
          }`}
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          onChange={handleInputChange}
        />

        <span className="popup__error" id="card-link-error">
          {errors.link}
        </span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}