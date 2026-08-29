interface Props {
  children?: React.ReactNode;
  onClick?: VoidFunction;
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
