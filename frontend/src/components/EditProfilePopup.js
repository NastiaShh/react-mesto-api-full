import React from 'react'
import PopupWithForm from './PopupWithForm.js'
import CurrentUserContext from './../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='profile'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'>

      <input id="name-input" type="text" name="name" value={name} onChange={handleChangeName} placeholder="Жак-Ив Кусто" required className="popup__input popup__input_profile_name" minLength="2" maxLength="40" />
      <span className="popup__input-error name-input-error"></span>
      <input id="description-input" type="text" name="description" value={description} onChange={handleChangeDescription} placeholder="Исследователь океана" required className="popup__input popup__input_profile_description" minLength="2" maxLength="200" />
      <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup