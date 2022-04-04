import React from "react"

function Login(props) {
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
    props.handleLogin(password, email)
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input type="email" name="email" value={email} onChange={handleChangeEmail} placeholder="Email" required className="login__input" minLength="2" maxLength="40" />
        <input type="password" name="password" value={password} onChange={handleChangePassword} placeholder="Пароль" required className="login__input" minLength="6" maxLength="40" />
        <button type="submit" onSubmit={handleSubmit} className="login__button" aria-label="Войти">Войти</button>
      </form>
    </div>
  );
}

export default Login