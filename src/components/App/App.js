import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import UserBlockedRoute from '../UserBlockedRoute/UserBlockedRoute.js';

function App() {
  const routes = useLocation();

  const isHeader =
    routes.pathname === '/movies' ||
    routes.pathname === '/' ||
    routes.pathname === '/saved-movies' ||
    routes.pathname === '/profile';


  // стейт, отвечающий за данные текущего пользвателя, сюда сохраняются данные о пользователе
  const [currentUser, setCurrentUser] = React.useState({});
  // стэйт переменная открыти попапа
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  // стэйт переменные регистрации и авторизации
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('isLoggedIn'));

  const [registerError, setRegisterError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [changeError, setChangeError] = React.useState("");

  // переменные состояния для попапов результата регистрации
  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [isInfoTooLtip, setIsInfoTooLtip] = React.useState(false);

  // переменная состояния для сохраненных фильмов в избранном
  const [favoriteList, setFavoriteList] = React.useState([]);
  const [favoriteListForRender, setFavoriteListForRender] = React.useState([]);
  const [shortList, setShortList] = React.useState([]);

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

  // добавление карточек в зависимости от ширины экрана
  useEffect(() => {
    function getCards() {
      if (width >= 1136) {
        setMoviesCount(12);
        setAddMovies(3);
      } else if (width < 1136 && width >= 671) {
        setMoviesCount(8);
        setAddMovies(2);
      } else if (width <= 671) {
        setMoviesCount(5);
        setAddMovies(1);
      }
    }
    getCards()
  }, [width])

  useEffect(() => {

    setIsLoading(true);
    // рендер первоначальной коллекции фильмов
    moviesApi.getInitialCards()
      .then((movies) => {
        setMoviesList(movies);
        sessionStorage.setItem('movies', JSON.stringify(movies));
        setIsLoading(false);
      }).catch((err) => {
        console.log(`Внимание! ${err}`);
      });



    // рендер сохраненных фильмов
    if (localStorage.getItem('savedMovies')) {
      setFavoriteList(JSON.parse(localStorage.getItem('savedMovies')));
      setFavoriteListForRender(JSON.parse(localStorage.getItem('savedMovies')));
    } else {
      setFavoriteList([]);
      setFavoriteListForRender([]);
    }

  }, [])


  // сохранение фильма
  function handleSaveMovies(movie) {
    const jwt = localStorage.getItem("jwt");
    console.log(movie)
    setFavoriteList([...favoriteList, movie]);
    mainApi.savedMovies({ jwt, movie })
      .then((res) => {
        console.log(res)
        console.log(favoriteList)
        setFavoriteList([...favoriteList, res]);
        localStorage.setItem('savedMovies', JSON.stringify([...favoriteList, res]));
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
        handleInfoTooLtip();
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
          const arr = JSON.parse(localStorage.getItem('savedMovies')).filter((item) => item.movieId !== id);
          setFavoriteList(arr)
          setFavoriteListForRender(arr);
          localStorage.setItem('savedMovies', JSON.stringify(arr));
        }
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
        handleInfoTooLtip();
      })
  }


  // изменение инорфмации о пользователе
  function handleUpdateUser({ name, email }) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    mainApi.updateUser({ jwt, name, email })
      .then((user) => {
        setTitle("Данные успешно изменены!");
        setImage(register);
        if (user._id) {
          setCurrentUser(user);
        }
        setIsLoading(false);
      }).catch((err) => {
        console.log(`Внимание! ${err}`);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
        setIsLoading(false);
      }).finally(
        handleInfoTooLtip)
  }


  // проверка токенов авторизованных пользователей, вернувшихся в приложение
  useEffect(() => {
    checkToken();
  }, [navigate]);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
      mainApi.getUserInfo(jwt)
        .then((profile) => {
          setIsLoggedIn(true);
          setCurrentUser(profile);
          localStorage.setItem('currentUser', JSON.stringify(profile))
        })
        .catch((err) => {
          navigate('/signin');
          console.log(`Внимание! ${err}`);
        })
    }
  }


  // регистрация
  function onRegister({ email, password, name }) {
    setIsLoading(true);
    mainApi.register({ email, password, name })
      .then((data) => {
        onLogin({ email, password });
        navigate('/movies');
        setTitle("Вы успешно зарегистрировались!");
        setImage(register);
        setIsLoggedIn(true);
        setIsLoading(false);
      }).catch((err) => {
        console.log(`Внимание! ${err}`);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
        if (err === 400) return setRegisterError('Некорректно заполнено одно из полей');
        setRegisterError('Что-то пошло не так, попробуйте еще раз!')
        setIsLoading(false);
      }).finally(handleInfoTooLtip)
  }



  // авторизация
  function onLogin({ email, password }) {
    mainApi.login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setData(() => {
          navigate('/movies');
        });
        return res;
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


  const setData = (callback) => {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");

    Promise.all([
      mainApi.getUserInfo(jwt),
      moviesApi.getInitialCards(),
      mainApi.getMovies(jwt)
    ]).then(([profile, movies, favorites]) => {

      setCurrentUser(profile);
      setMoviesList(movies);

      const favoritesForCurrentUser = favorites.data.filter((movie) => movie.owner === profile._id);

      setFavoriteList(favoritesForCurrentUser);
      setFavoriteListForRender(favoritesForCurrentUser);
      setIsLoggedIn(true);

      localStorage.setItem('currentUser', JSON.stringify(profile));
      localStorage.setItem('movies', JSON.stringify(movies));
      localStorage.setItem('savedMovies', JSON.stringify(favoritesForCurrentUser));
      localStorage.setItem('isLoggedIn', true);

      if (callback) {
        callback();
      }

      setIsLoading(false);
    }).catch((err) => {
      console.log(`Внимание! ${err}`);
    })
  };

  // удаление токена при выходе
  function signOut() {
    localStorage.clear();
    navigate("/");
    setCurrentUser([]);
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {isHeader && <Header>
          {isLoggedIn ? <Navigation onHeaderOpen={onHeaderOpen} /> : <SigninButton />}
        </Header>}

        {<Routes>
          <Route path='/movies' element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              component={Movies}
              onHeaderOpen={onHeaderOpen}
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
            ></ProtectedRoute>
          } ></Route>
          <Route path="/" element={
            <Main />
          } />
          <Route path="/saved-movies" element={

            <ProtectedRoute
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              onHeaderOpen={onHeaderOpen}
              favoriteList={favoriteList}
              setFavoriteList={setFavoriteList}
              favoriteListForRender={favoriteListForRender}
              setFavoriteListForRender={setFavoriteListForRender}
              shortList={shortList}
              setShortList={setShortList}
              handleDeleteMovies={handleDeleteMovies}
              handleSaveMovies={handleSaveMovies}
              moviesList={moviesList}
              setMoviesList={setMoviesList}
              moviesCount={moviesCount}
              setMoviesCount={setMoviesCount}
              addMovies={addMovies}
              setAddMovies={setAddMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            >
            </ProtectedRoute>

          } />
          <Route path="/profile" element={
            <ProtectedRoute
              component={Profile}
              isLoggedIn={isLoggedIn}
              signOut={signOut}
              onUpdateUser={handleUpdateUser}
              changeError={changeError}
              isLoading={isLoading}
            >
            </ProtectedRoute>
          } />
          <Route path="/signin"
            element={<UserBlockedRoute
              component={Login}
              isLoggedIn={isLoggedIn}
              onLogin={onLogin}
              loginError={loginError}
              isLoading={isLoading}
              setIsLoggedIn={setIsLoggedIn}
            ></UserBlockedRoute>} />
          <Route path="/signup" element={
            <UserBlockedRoute
              component={Register}
              isLoggedIn={isLoggedIn}
              onRegister={onRegister}
              registerError={registerError}
              setRegisterError={setRegisterError}
              isLoading={isLoading}>
            </UserBlockedRoute>
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>}

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