import React from "react"
import { Link } from 'react-router-dom'

function Register(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.handleRegister(password, email)
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input type="email" name="email" value={email} onChange={handleChangeEmail} placeholder="Email" required className="register__input" minLength="2" maxLength="40" />
        <input type="password" name="password" value={password} onChange={handleChangePassword} placeholder="Пароль" required className="register__input" minLength="6" maxLength="40" />
        <button type="submit" onSubmit={handleSubmit} className="register__button" aria-label="Зарегистрироваться">Зарегистрироваться</button>
        <p className="register__login-sign">Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="register__login-link">Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default Register