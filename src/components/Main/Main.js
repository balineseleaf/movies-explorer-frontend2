import AboutProject from "../AboutProject/AboutProject";
import React from "react";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from "../NavTab/NavTab";
import './Main.css';

function Main() {
  return (
    <main className="main">
      <Promo></Promo>
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <Portfolio></Portfolio>
    </main>
  )
}

export default Main;