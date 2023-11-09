import './Navigation.css';

const Navigation = (props) => {
  const { className, children } = props;
  return <nav className={`navigation ${className ?? ''}`}>{children}</nav>;
};

export default Navigation;
