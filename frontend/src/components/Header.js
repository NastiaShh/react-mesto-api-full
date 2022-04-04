import logo from '../images/logo.svg'
import { Switch, Route, Link } from 'react-router-dom'

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта. Mesto. Russia" />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/">
          <div className="header__authorized">
            <p className="header__email">{props.email}</p>
            <button className="header__logout-button" onClick={props.onSignOut}>Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  )
}

export default Header