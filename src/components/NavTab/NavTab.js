import React from "react";
import './NavTab.css';

function NavTab() {
  return (
    <nav className="navigation section">
      <ul className="navigation__list">
        <li><a className="navigation__link" href="#about-project">О проекте</a></li>
        <li><a className="navigation__link" href="#tech">Технологии</a></li>
        <li><a className="navigation__link" href="#student">Студент</a></li>
      </ul>
    </nav>
  )
}

export default NavTab;