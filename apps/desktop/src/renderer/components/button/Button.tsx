interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: VoidFunction;
}

const Button: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
