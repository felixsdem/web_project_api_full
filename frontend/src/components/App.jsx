import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import api from "../utils/api.js";
import { authorize, checkToken, register } from "../utils/auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(() => {
    return Boolean(localStorage.getItem("jwt"));
  });

  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((data) => {
        return api.getUserInfo().then((userData) => ({
          ...userData,
          email: data.email,
        }));
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => console.error(error));
  }, [loggedIn]);

  function handleLogin({ email, password }) {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return checkToken(data.token);
      })
      .then((data) => {
  return api.getUserInfo().then((userData) => ({
    ...userData,
    email: data.email,
  }));
})
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        setIsCheckingAuth(false);
        navigate("/");
      })
      .catch((error) => console.error(error));
  }

  function handleRegister({ email, password }) {
    register(email, password)
      .then(() => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: true,
        });

        navigate("/signin");
      })
      .catch((error) => {
        console.error(error);

        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
        });
      });
  }

  function handleCloseInfoTooltip() {
    setInfoTooltip({
      isOpen: false,
      isSuccess: false,
    });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/signin");
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    api
      .editUserProfile(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  function handleAddCard(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Routes>
        <Route
          path="/signin"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              isCheckingAuth={isCheckingAuth}
            >
              <CurrentUserContext.Provider
                value={{
                  currentUser,
                  handleUpdateUser,
                  handleUpdateAvatar,
                }}
              >
                <div className="page__content">
                  <Header onLogout={handleLogout} />

                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddCard={handleAddCard}
                  />

                  <Footer />
                </div>
              </CurrentUserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/signin" replace />}
        />
      </Routes>

      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={handleCloseInfoTooltip}
        isSuccess={infoTooltip.isSuccess}
      />
    </>
  );
}

export default App;