import styles from './index.less';
import { useEffect, useRef } from 'react';
import Draw from './draw';

export default function HandwrittenSignaturePage() {
  const canvas = useRef(null);
  useEffect(() => {
    const canvas1 = Draw(canvas, 90);
  }, []);
  return (
    <div className={styles.signature}>
      <canvas ref={canvas}></canvas>
    </div>
  );
}
