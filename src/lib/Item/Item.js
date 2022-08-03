import styles from './index.less';

export function Item({ label, children }) {
  return (
    <div className={styles.main}>
      <label>{label}</label>
      {children}
    </div>
  );
}
