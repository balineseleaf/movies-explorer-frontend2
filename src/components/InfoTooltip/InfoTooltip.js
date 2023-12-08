import React from "react";
import './InfoTooltip.css';

const errorMessages = {
  auth: "Вы ввели неправильный логин или пароль.",
  conflict: "Пользователь с таким email уже существует.",
  register: "При регистрации пользователя произошла ошибка.",
  noToken: "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
  edit: "При обновлении профиля произошла ошибка.",
  server: "500 На сервере произошла ошибка.",
  route: "404 Страница по указанному маршруту не найдена.",
  wrongToken: "При авторизации произошла ошибка. Переданный токен некорректен.",
};

function InfoTooltip({ errorType }) {
  const errorMessage = errorMessages[errorType] || "";

  // function HideInfoTooltip(){
  //   document.querySelector('.form__tooltip-text').classList.add('form__tooltip-text_slow');
  // }
  // setTimeout(HideInfoTooltip, 3000);

  return (
    <span className="form__tooltip-text" id="text">{errorMessage}</span>    
  )
}

export default InfoTooltip;