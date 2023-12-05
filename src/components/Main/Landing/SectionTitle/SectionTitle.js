import './SectionTitle.css';

const SectionTitle = (props) => {
  const { children } = props;
  return <h2 className="title">{children}</h2>;
};
export default SectionTitle;
