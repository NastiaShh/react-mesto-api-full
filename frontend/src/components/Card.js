import React from "react"
import CurrentUserContext from './../contexts/CurrentUserContext'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  // переменные для кнопки удаления карточки
  const isOwn = props.owner === currentUser._id
  const cardDeleteButtonClassName = (
    `place__delete ${isOwn ? 'place__delete_active' : ''}`
  )

  // переменные для кнопки лайка карточки
  const isLiked = props.card.likes.some(i => i === currentUser._id)
  const cardLikeButtonClassName = (
    `place__like ${isLiked ? 'place__like_active' : ''}`
  )

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleCardLike() {
    props.onCardLike(props.card)
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    // <template className="template template_card">
      <article className="place">
        <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete} aria-label="Удалить место"></button>
        <img className="place__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
        <div className="place__info">
          <h2 className="place__title">{props.card.name}</h2>
          <div className="place__like-container">
            <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike} aria-label="Поставить лайк"></button>
            <div className="place__like-count">{props.card.likes.length}</div>
          </div>
        </div>
      </article>
    // </template>
  )
}

export default Card