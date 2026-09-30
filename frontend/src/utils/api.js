class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  editUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data["card-name"],
        link: data.url,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.felix-around.chickenkiller.com",
});

export default api;
