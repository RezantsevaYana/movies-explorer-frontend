import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SigninButton from "../SigninButton/SigninButton";

function Main() {
    return (
        <>
            <Header><SigninButton/></Header>
            <Promo></Promo>
            <AboutProject></AboutProject>
            <Techs></Techs>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>
            <Footer></Footer>
        </>


    );
}

export default Main;