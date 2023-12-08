import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio section' id='student'>
      <h2 className='section__header portfolio__header'>Студент</h2>
      <div className='student'>
        <div className='student-info'>
          <h3 className='student-info__name'>Михаил</h3>
          <p className='student-info__caption'>Фронтенд-разработчик, 27 лет</p>
          <p className='student-info__story'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб- разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className='student-info__link'
            href='https://github.com/balineseleaf'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <div className='student__photo' />
      </div>
      <nav>
        <h3 className='portfolio__title'>Портфолио</h3>
        <ul className='portfolio__links'>
          <li className='portfolio__links-item'>
            <a
              className='portfolio__link'
              href='https://github.com/balineseleaf/how-to-learn'
              target='_blank'
              rel='noreferrer'
            >
              <p className='portfolio__link-name'>Статичный сайт</p>
            </a>
          </li>
          <li className='portfolio__links-item'>
            <a
              className='portfolio__link'
              href='https://github.com/balineseleaf/russian-travel'
              target='_blank'
              rel='noreferrer'
            >
              <p className='portfolio__link-name'>Адаптивный сайт</p>
            </a>
          </li>
          <li className='portfolio__links-item'>
            <a
              className='portfolio__link'
              href='https://github.com/balineseleaf/react-mesto-api-full-gha'
              target='_blank'
              rel='noreferrer'
            >
              <p className='portfolio__link-name'>Одностраничное приложение</p>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
