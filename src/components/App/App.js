import React from 'react';
import { Routes, Route } from "react-router-dom";
import Movies from '../Movies/Movies.js';
import HeaderPopup from '../HeaderPopup/HeaderPopup.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Main from '../Main/Main.js';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/movies' element={
          <Movies />
        }></Route>
        <Route path="/" element={
            <Main />
            }>
        </Route>
        <Route path="/saved-movies" element={
            <SavedMovies />
        }>
        </Route>
        <Route path="/profile" element={
          <Profile
          name='Яна'
          ></Profile>
        }>
        </Route>
        <Route path="/signin" element={
          <Login
          title="Рады видеть!"></Login>
        }></Route>
        <Route path="/signup" element={
          <Register
          title="Добро пожаловать!"
          ></Register>
        }></Route>
        <Route path="*" element={
          <NotFound></NotFound>
        }
        ></Route>
      </Routes>

      <HeaderPopup />

      
    </div>
  );
}

export default App;


// отображение скрытых блоков - попап
// список сохраненных фильмов
// кнопки


