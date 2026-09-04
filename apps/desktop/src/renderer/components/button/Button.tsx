import classNames from 'classnames';
import styles from './Button.module.css';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
  onClick?: VoidFunction;
}

const Button: React.FC<Props> = ({ type = 'button', children, className, onClick }) => {
  return (
    <button type={type} className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
