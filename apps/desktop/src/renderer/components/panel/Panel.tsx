interface Props {
  children?: React.ReactNode;
}

const Panel: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Panel;
