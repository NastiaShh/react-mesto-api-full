import React from "react"
import Successful_Registration from '../images/Successful_Registration.svg'
import Unuccessful_Registration from '../images/Unsuccessful_Registration.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup popup_register-tooltip ${props.isOpen && 'popup_open'}`}>
      <div className={`popup__content popup__content_register-tooltip`}>
        <button type="button" className="popup__close" aria-label="Закрыть окно" onClick={props.onClose}></button>
        <img className="popup__register-tooltip-img" src={props.isSuccess ? Successful_Registration : Unuccessful_Registration} />
        <h3 className={`popup__title popup__title_register-tooltip`}>{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip