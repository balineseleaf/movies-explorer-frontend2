import { Link } from 'react-router-dom';
import Navigation from '../../../Navigation/Navigation';
import './Portfolio.css';
import { EXTERNAL_LINKS } from '../../../../utils/constants';

const Portfolio = () => {
  const { staticSite, adaptiveSite, SPA } = EXTERNAL_LINKS;

  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <Navigation className='portfolio__nav'>
          <ul className='portfolio__items'>
            <li className='portfolio__item'>
              <Link className='portfolio__link' to={staticSite} target='_blank'>
                Статичный сайт
              </Link>
            </li>
            <li className='portfolio__item'>
              <Link
                className='portfolio__link'
                to={adaptiveSite}
                target='_blank'
              >
                Адаптивный сайт
              </Link>
            </li>
            <li className='portfolio__item'>
              <Link className='portfolio__link' to={SPA} target='_blank'>
                Одностраничное приложение
              </Link>
            </li>
          </ul>
        </Navigation>
      </div>
    </section>
  );
};

export default Portfolio;
