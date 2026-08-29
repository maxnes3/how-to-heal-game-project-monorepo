import styles from './Text.module.css';

interface Props {
  children?: React.ReactNode;
}

const Text: React.FC<Props> = ({ children }) => {
  return <p className={styles.text_p}>{children}</p>;
};

export default Text;
