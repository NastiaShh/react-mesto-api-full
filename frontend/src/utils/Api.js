class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
    }})
    .then(this._checkResponseStatus);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponseStatus)
  }

  setUserInfo({name, about}) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({
        name: name, 
        about: about})
    })
    .then(this._checkResponseStatus);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({avatar})
    })
    .then(this._checkResponseStatus);
  }

  addCard({name, link}) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({
        name: name, 
        link: link})
    })
    .then(this._checkResponseStatus);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponseStatus)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
    })
    .then(this._checkResponseStatus);
  }
}

const api = new Api({
  address: 'https://nomoreparties.co/v1/cohort-32',
  token: '6e39987b-3720-4720-b442-4085767cdc72'
})

export default api