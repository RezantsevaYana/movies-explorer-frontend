import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Movies from '../Movies/Movies.js';
import HeaderPopup from '../HeaderPopup/HeaderPopup.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Main from '../Main/Main.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { mainApi } from '../../utils/MainApi.js';
import moviesApi from "../../utils/MoviesApi.js";
import notRegister from "../../images/negativ-result.svg";
import register from "../../images/positiv_result.svg";
import InfoTooLtip from '../InfoTooLtip/InfoTooltip.js';
import Header from '../Header/Header.js';
import Navigation from '../Navigation/Navigation.js';
import SigninButton from '../SigninButton/SigninButton.js';
import ScreenSize from '../../hooks/ScreenSize.js';


function App() {
  // стейт, отвечающий за данные текущего пользвателя, сюда сохраняются данные о пользователе
  const [currentUser, setCurrentUser] = React.useState({});
  // стэйт переменная открыти попапа
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  // стэйт переменные регистрации и авторизации
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [registerError, setRegisterError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [changeError, setChangeError] = React.useState("");

  // переменные состояния для попапов результата регистрации (не реализовано, оставлено напоследок)
  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [isInfoTooLtip, setIsInfoTooLtip] = React.useState(false);

  // переменная состояния для сохраненных фильмов в избранном
  const [favoriteList, setFavoriteList] = React.useState([]);
  const [moviesList, setMoviesList] = React.useState([]);
  // переменные состояния для добавления фильмов
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [addMovies, setAddMovies] = React.useState(0);

  const navigate = useNavigate();

  // ширина
  const width = ScreenSize();

  // отображение прейлодера
  const [isLoading, setIsLoading] = React.useState(false);

  // открытие попапов
  function onHeaderOpen() {
    setIsPopupOpen(true)
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsPopupOpen(false);
    setIsInfoTooLtip(false);
  }
  // для результата авторизации и регистрации и изменения пользователя
  function handleInfoTooLtip() {
    setIsInfoTooLtip(true);
  }

  function getCards() {
    if (width >= 1280) {
      setMoviesCount(12);
      setAddMovies(3);
    } else if (width < 1279 && width >= 767) {
      setMoviesCount(8);
      setAddMovies(2);
    } else if (width <= 766) {
      setMoviesCount(5);
      setAddMovies(1);
    }
  }

  // рендер карточек
  useEffect(() => {
    setIsLoading(true);
    moviesApi.getInitialCards()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
        getCards()
        setMoviesList(movies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
      });
  }, [width]);

  // сохранение фильма
  function handleSaveMovies(movie) {
    const jwt = localStorage.getItem("jwt");
    console.log(movie)
    setFavoriteList([...favoriteList, movie]);
    mainApi.savedMovies({ jwt, movie })
      .then((res) => {
        console.log(res);
        console.log(favoriteList)
        setFavoriteList([...favoriteList, res]);
        localStorage.setItem('savedMovies', JSON.stringify([...favoriteList, res]));
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
      })
  }

  // удаление фильма
  function handleDeleteMovies(movie) {
    const jwt = localStorage.getItem("jwt");
    const id = movie.movieId || movie.id;
    const movieId =
      movie._id || favoriteList.find((item) => item.movieId === movie.id)._id;
    mainApi.deleteMovies({ jwt, movieId }).
      then((res) => {
        console.log(res);
        if (res) {
          const arr = favoriteList.filter((item) => item.movieId !== id);
          setFavoriteList(arr);
          localStorage.setItem('savedMovies', JSON.stringify(arr));
        }

      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
      })
  }

  // изменение инорфмации о пользователе
  function handleUpdateUser({ name, email }) {
    const jwt = localStorage.getItem("jwt");
    mainApi.updateUser({ jwt, name, email })
      .then((user) => {
        setTitle("Данные успешно изменены!");
        setImage(register);
        if (user._id) {
          setCurrentUser(user);
        }
      }).catch((err) => {
        console.log(`Внимание! ${err}`);
        setChangeError('Что-то пошло не так! Попробуйте ещё раз.')
        setImage(notRegister);
        setRegisterError('Что-то пошло не так! Попробуйте ещё раз.');
      }).finally(handleInfoTooLtip)
  }

  // проверка токенов авторизованных пользователей, вернувшихся в приложение
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt)
      // проверяем токен
      mainApi
        .checkToken(jwt)
        .then((res) => {
          // авторизуем пользователя, если токен найден, перенаправляя его на главную страницу
          if (res) {
            setCurrentUser(res)
            setIsLoggedIn(true);
            // navigate("/");
          } else {
            setCurrentUser({})
          }
        })
        .catch((err) => {
          console.log(`Внимание! ${err}`);
          navigate("/signin");
        });
  }, [navigate]);

  // регистрация
  function onRegister({ email, password, name }) {
    mainApi.register({ email, password, name })
      .then((data) => {
        if (data.id) {
          navigate('/signin');
          onLogin({ email, password });
        }
        setTitle("Вы успешно зарегистрировались!");
        setImage(register);
      }).catch((err) => {
        console.log(`Внимание! ${err}`);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
        setRegisterError('Что-то пошло не так! Попробуйте ещё раз.');
        if (err === 400) return setRegisterError('Некорректно заполнено одно из полей');
      }).finally(handleInfoTooLtip)
  }

  // авторизация
  function onLogin({ email, password }) {
    mainApi.login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          //  console.log(res.token);
          setIsLoggedIn(true);
          navigate('/movies');
          return res;
        } else {
          return
        }
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
        setLoginError('Что-то пошло не так, попробуйте еще раз!');
        if (err === 400) return setRegisterError('Некорректно заполнено одно из полей');
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
        handleInfoTooLtip()
      })
  }

  // удаление токена при выходе
  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('savedMovies');
    navigate("/signin");
    setFavoriteList([]);
    setMoviesList([]);
    setCurrentUser([]);
    setIsLoggedIn(false);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/movies' element={
            <>
              <Header>
                {isLoggedIn ? <Navigation onHeaderOpen={onHeaderOpen} /> : <SigninButton />}
              </Header>
              <Movies onHeaderOpen={onHeaderOpen}
                handleSaveMovies={handleSaveMovies}
                handleDeleteMovies={handleDeleteMovies}
                favoriteList={favoriteList}
                moviesList={moviesList}
                setMoviesList={setMoviesList}
                moviesCount={moviesCount}
                setMoviesCount={setMoviesCount}
                addMovies={addMovies}
                setAddMovies={setAddMovies}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </>
          } />
          <Route path="/" element={
            <>
              <Header>
                {isLoggedIn ? <Navigation onHeaderOpen={onHeaderOpen} /> : <SigninButton />}
              </Header>
              <Main />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              <Header>
                {isLoggedIn ? <Navigation onHeaderOpen={onHeaderOpen} /> : <SigninButton />}
              </Header>
              <SavedMovies
                onHeaderOpen={onHeaderOpen}
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
                handleDeleteMovies={handleDeleteMovies}
                moviesList={moviesList}
                setMoviesList={setMoviesList}
                moviesCount={moviesCount}
                setMoviesCount={setMoviesCount}
                addMovies={addMovies}
                setAddMovies={setAddMovies}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header>
                {isLoggedIn ? <Navigation onHeaderOpen={onHeaderOpen} /> : <SigninButton />}
              </Header>
              <Profile signOut={signOut} onUpdateUser={handleUpdateUser} changeError={changeError} />
            </>
          } />
          <Route path="/signin" element={
            <Login onLogin={onLogin} loginError={loginError} />
          } />
          <Route path="/signup" element={
            <Register onRegister={onRegister}
              registerError={registerError}
              setRegisterError={setRegisterError} />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>

        <HeaderPopup isOpen={isPopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooLtip
          image={image}
          title={title}
          onClose={closeAllPopups}
          isOpen={isInfoTooLtip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
