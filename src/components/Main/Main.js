import './Main.css';

const Main = (props) => {
  const { children, className } = props;
  return <main className={`main ${className}`}>{children}</main>;
};

export default Main;
