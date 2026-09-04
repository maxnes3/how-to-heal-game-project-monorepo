import classNames from 'classnames';
import styles from './Text.module.css';

interface Props {
  variant?: 'h1' | 'span' | 'paragraph';
  className?: string;
  children?: React.ReactNode;
}

const Text: React.FC<Props> = ({ variant = 'span', className, children }) => {
  if (variant === 'h1') {
    return <h1 className={classNames(styles.textH1, className)}>{children}</h1>;
  }

  if (variant === 'paragraph') {
    return <p className={classNames(styles.textParagraph, className)}>{children}</p>;
  }

  return <span className={classNames(styles.textSpan, className)}>{children}</span>;
};

export default Text;
