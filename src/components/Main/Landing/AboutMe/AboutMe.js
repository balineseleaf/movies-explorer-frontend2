import './AboutMe.css';
import SectionTite from '../SectionTitle/SectionTitle';
import picOfSudent from '../../../../images/picOfStudent.png';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <section className="about-me main__container" id="about-me">
      <div className="about-me__container">
        <SectionTite>Студент</SectionTite>
        <div className="about-me__wrapper">
          <div className="about-me__info">
            <h3 className="about-me__title">Михаил</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 27 лет</p>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб- разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link
              className="about-me__link"
              to="https://github.com/balineseleaf"
              target="_blank"
            >
              Github
            </Link>
          </div>
          <img
            className="about-me__image"
            src={picOfSudent}
            alt="Фото студента"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
