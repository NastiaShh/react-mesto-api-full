import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import api from '../utils/Api.js'
import * as auth from '../utils/Auth.js'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ImagePopup from './ImagePopup.js'
import Login from './Login.js'
import Register from './Register.js'
import ProtectedRoute from './ProtectedRoute.js'
import InfoTooltip from './InfoTooltip.js'
import CurrentUserContext from './../contexts/CurrentUserContext'
import '../index.css'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: ''
  })
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  })
  const [cards, setCards] = useState([])
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const history = useHistory()
  
  // useEffect(() => {
  //   api.getUserInfo()
  //     .then(userData => {
  //       setLoggedIn(true)
  //       setCurrentUser(userData)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  
  // useEffect(() => {
  //   api.getInitialCards()
  //     .then(cardsData => {
  //       setCards(cardsData.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(err)
      })

    api.getInitialCards()
      .then(cardsData => {
        setCards(cardsData.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loggedIn])

  function handleCardLike(card) {
    console.log(card)
    const isLiked = card.likes.some(like => like._id === currentUser._id)

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(data => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoToolTipOpen(false)
    setSelectedCard({
      name: '',
      link: ''
    })
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => {
        setIsSuccess(true)
        setIsInfoToolTipOpen(true)
        handleLogin(password, email)
      })
      .catch((err) => {
        setIsSuccess(false)
        setIsInfoToolTipOpen(true)
        console.log(err)
      })
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then(() => {
          setLoggedIn(true)
          setUserEmail(email)
          history.push('/')
      })
      .catch((err) => {
        setIsSuccess(false)
        setIsInfoToolTipOpen(true)
        console.log(err)
      })
  }

  function handleSignOut(){
    setLoggedIn(false)
    setUserEmail('')
    history.push('/sign-in')
  }

  // function handleTokenCheck() {
  //   if (localStorage.getItem('jwt')) {
  //     const token = localStorage.getItem('jwt')
  //     auth.checkToken(token)
  //       .then(res => {
  //         if (res) {
  //           setLoggedIn(true)
  //           setUserEmail(res.data.email)
  //           history.push('/')
  //         }
  //       })
  //   }
  // }

  // useEffect(() => {
  //   handleTokenCheck();
  // }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={userEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            handleCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} isSuccess={isSuccess} />

      </CurrentUserContext.Provider>
    </>
  )
}

export default App