import styles from './index.less';

export default function HandwrittenSignaturePage() {
  return (
    <div className={styles.evaluation}>
      <div className={styles.empty}>☆☆☆☆☆</div>
      <div className={styles.full}>★★★★★</div>
    </div>
  );
}
