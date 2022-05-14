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
  const [isUserCheck, setIsUserCheck] = React.useState(false);

  const [registerError, setRegisterError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [changeError, setChangeError] = React.useState("");

  // переменные состояния для попапов результата регистрации (не реализовано, оставлено напоследок)
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
    getCards()
  }, [width])

  console.log(isLoggedIn)


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



  //console.log(favoriteList)


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
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
      }).finally(handleInfoTooLtip)
  }


  // проверка токенов авторизованных пользователей, вернувшихся в приложение
  useEffect(() => {
    console.log('useEffect в App отработал');
    checkToken();
  }, [navigate]);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
      mainApi.getUserInfo(jwt)
        .then((profile) => {
          setIsLoggedIn(true);
          console.log(profile)
          setCurrentUser(profile);
          localStorage.setItem('currentUser', JSON.stringify(profile))
          navigate(routes.pathname);
        })
        .catch((err) => {
          navigate('/signin');
          console.log(`Внимание! ${err}`);
        })
    }
  }


  // регистрация
  function onRegister({ email, password, name }) {
    mainApi.register({ email, password, name })
      .then((data) => {
        onLogin({ email, password });
        navigate('/movies');
        setTitle("Вы успешно зарегистрировались!");
        setImage(register);
        setIsLoggedIn(true);
      }).catch((err) => {
        console.log(`Внимание! ${err}`);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(notRegister);
        if (err === 400) return setRegisterError('Некорректно заполнено одно из полей');
        setRegisterError('Что-то пошло не так, попробуйте еще раз!')
      }).finally(handleInfoTooLtip)
  }



  // авторизация
  function onLogin({ email, password }) {
    mainApi.login({ email, password })
      .then((res) => {
        navigate('/movies');
     //   setData();
        localStorage.setItem("jwt", res.token);
        localStorage.setItem('currentUser', JSON.stringify(res));
        // console.log(res.token);
        localStorage.setItem('isLoggedIn', true)
        setIsLoggedIn(true);
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

 
 useEffect(() => {
   if (isLoading) {
    setData();
   }

 }, [isLoggedIn])


  function setData() {
   // setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    const profileInfo = mainApi.getUserInfo(jwt);
    const movies = moviesApi.getInitialCards();
    const favoriteMovies = mainApi.getMovies(jwt);
    console.log('setdata отработал')
    Promise.all([profileInfo, movies, mainApi.getMovies(jwt)])
      .then((res) => {
        console.log('промис отработал')
        console.log(res.data)
        setCurrentUser(res[0].data);
        setMoviesList(res[1].data);
        
        const isLiked = res.data.filter((movie) => movie.owner === currentUser._id);
  
        setFavoriteList(isLiked);
        setFavoriteListForRender(isLiked);
        
        
        localStorage.setItem('currentUser', JSON.stringify(res[0].data));
        localStorage.setItem('movies', JSON.stringify(res[1].data));
        localStorage.setItem('savedMovies', JSON.stringify(isLiked));
      //  setIsLoading(false);
      }).catch((err) => {
        console.log(`Внимание! ${err}`);
      })
  };

  console.log(favoriteList)

  // удаление токена при выходе
  function signOut() {
    console.log('signOut в App отработал')
    localStorage.clear();
    navigate("/");
    //setFavoriteList([]);
    //  setMoviesList([]);
    setCurrentUser([]);
    setIsLoggedIn(false);
  }

//  console.log(currentUser)

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
            >
            </ProtectedRoute>

          } />
          <Route path="/signin"
            element={<ProtectedRoute
              component={Login}
              isLoggedIn={!isLoggedIn}
              onLogin={onLogin}
              loginError={loginError}
            ></ProtectedRoute>} />
          <Route path="/signup" element={
            <ProtectedRoute
              component={Register}
              isLoggedIn={!isLoggedIn}
              onRegister={onRegister}
              registerError={registerError}
              setRegisterError={setRegisterError}>
            </ProtectedRoute>
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


/*
1. После выхода из приложение стейт в апп показывает фалс, но в продект роут прокидывается тру
2. После авторизации в приложении первоначальный рендер коллекции карточек выдает ошибку, после обновления все начинает работать
3. В профайл приходит информация только после обновления (решено, но зациклена переадресация)
3. Как сделать так, чтобы за конкретным пользователем закреплялись конкретнные сохраненные фильмы
4. После обновления страницы все слетает, лайки и сохраненные фильмы должны оставаться
5. после входа попадаем на страницу главную, хотя направление стоит на фильмы

основные проблемы:
1 циклический редирект
2 стейт логина в продект роут идет тру, даже если в апп он фолс
3 как за конкретным пользователем сохранить его фильмы, чтобы при новом заходе все оставалось
*/



