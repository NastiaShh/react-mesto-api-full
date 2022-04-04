import React from 'react'
import Card from './Card.js'
import CurrentUserContext from './../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button type="button" className="profile__avatar-button" aria-label="Изменить аватар" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          </button>
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button type="button" className="profile__info-edit" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
            <p className="profile__info-description">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add" aria-label="Добавить фотографию" onClick={props.onAddPlace}></button>
      </section>

      <section className="places">
        {
          props.cards.map(card => {
            return (
              <Card
                card={card}
                key={card._id}
                owner={card.owner}
                onCardClick={props.handleCardClick}
                onCardLike={props.handleCardLike}
                onCardDelete={props.handleCardDelete}
              />
            )
          })
        }
      </section>

    </main>
  )
}

export default Main