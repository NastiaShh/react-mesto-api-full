function ImagePopup(props) {
  return (
    <div className={`popup popup_place-image ${props.card.name === '' ? '' : 'popup_open'}`}>
      <div className="popup__content popup__content_image">
        <button type="button" className="popup__close popup__close_image" aria-label="Закрыть окно" onClick={props.onClose}></button>
        <figure className="figure">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__image-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup