interface Props {
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Modal;
