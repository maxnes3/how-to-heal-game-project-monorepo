import classNames from 'classnames';
import styles from './Template.module.css';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const Template: React.FC<Props> = ({ className, children }) => {
  return <template className={classNames(styles.template, className)}>{children}</template>;
};

export default Template;
