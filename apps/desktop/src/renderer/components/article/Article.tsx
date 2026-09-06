import classNames from 'classnames';
import styles from './Article.module.css';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const Article: React.FC<Props> = ({ className, children }) => {
  return <div className={classNames(styles.article, className)}>{children}</div>;
};

export default Article;
