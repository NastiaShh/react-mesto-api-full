import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar(
      avatarRef.current.value
    )
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='change-avatar'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'>

      <input id="avatar-input" type="url" name="avatar" ref={avatarRef} placeholder="Ссылка на картинку" required className="popup__input popup__input_change-avatar" />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup