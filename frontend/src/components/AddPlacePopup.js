import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  function handleSetName(e) {
    setName(e.target.value)
  }

  function handleSetLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({ name, link })
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='place'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Создать'>

      <input id="place-input" type="text" name="name" value={name} onChange={handleSetName} placeholder="Название" required className="popup__input popup__input_place_name" minLength="2" maxLength="30" />
      <span className="popup__input-error place-input-error"></span>
      <input id="link-input" type="url" name="description" value={link} onChange={handleSetLink} placeholder="Ссылка на картинку" required className="popup__input popup__input_place_description" />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup