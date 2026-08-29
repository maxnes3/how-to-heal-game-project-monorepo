interface Props {
  children?: React.ReactNode;
}

const ProgressBar: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default ProgressBar;
