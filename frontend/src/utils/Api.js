// для локальной отладки
// export const BASE_URL = 'http://localhost:3000'
class Api {
  constructor({address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponseStatus);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponseStatus)
  }

  setUserInfo({name, about}) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      
      body: JSON.stringify({
        name: name, 
        about: about})
    })
    .then(this._checkResponseStatus);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      
      body: JSON.stringify({avatar})
    })
    .then(this._checkResponseStatus);
  }

  addCard({name, link}) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      
      body: JSON.stringify({
        name: name, 
        link: link})
    })
    .then(this._checkResponseStatus);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponseStatus)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers, 
    })
    .then(this._checkResponseStatus);
  }
}

const api = new Api({
  address: 'https://api.mesto.nsh.nomoredomains.work',
  // для локальной отладки
  // address: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default api