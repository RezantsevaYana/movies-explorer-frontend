import React from 'react';
import { Routes, Route } from "react-router-dom";
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Promo from '../Promo/Promo.js';
import AboutProject from "../AboutProject/AboutProject.js"
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import AccountButton from '../Navigation/Navigation.js';
import Movies from '../Movies/Movies.js';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/movies' element={
          <>
            <Header 
            title = "Фильмы"
            subtitle = "Сохраненные фильмы"
            logIn = ""
            titleButton = ""
            />
            <Movies></Movies>
            <Footer></Footer>
          </>
        }></Route>
      
        <Route path="/" element={
          <>
            <Header 
              title = ""
              subtitle = ""
              logIn = "Регистрация"
              titleButton = "Войти"
            />
            <Promo></Promo>
            <AboutProject></AboutProject>
            <Techs></Techs>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>
            <Footer></Footer>
          </>
            }></Route>
        <Route path="/saved-movies" element={
          <>
            <Header 
            title = "Фильмы"
            subtitle = "Сохраненные фильмы"
            logIn = ""
            titleButton = "Аккаунт"
            />
            <Footer></Footer>
          </>
        }>
        </Route>
        <Route path="/profile"></Route>
        <Route path="/signin"></Route>
        <Route path="/signup"></Route>
      </Routes>
      
    </div>
  );
}

export default App;

// стилизовать navtab
