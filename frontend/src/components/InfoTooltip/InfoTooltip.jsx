function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`info-tooltip ${isOpen ? "info-tooltip_opened" : ""}`}>
      <div className="info-tooltip__content">
        <button
          className="info-tooltip__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />

        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        />

        <h2 className="info-tooltip__title">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "¡Ups! Algo salió mal."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;