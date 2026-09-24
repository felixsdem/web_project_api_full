import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validateForm() {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Debes introducir un correo electrónico.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!password.trim()) {
      newErrors.password = "Debes introducir una contraseña.";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onRegister({
      email: email.trim(),
      password,
    });
  }

  return (
    <main className="auth">
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <h1 className="auth__title">Crear cuenta</h1>

        <input
          className={`auth__input ${
            errors.email ? "auth__input_type_error" : ""
          }`}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrors((currentErrors) => ({
              ...currentErrors,
              email: "",
            }));
          }}
          required
        />

        <span className="auth__error">{errors.email}</span>

        <input
          className={`auth__input ${
            errors.password ? "auth__input_type_error" : ""
          }`}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setErrors((currentErrors) => ({
              ...currentErrors,
              password: "",
            }));
          }}
          required
        />

        <span className="auth__error">{errors.password}</span>

        <button className="auth__button" type="submit">
          Registrarse
        </button>

        <p className="auth__register-text">
          ¿Ya tienes una cuenta?{" "}
          <Link className="auth__register-link" to="/signin">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
