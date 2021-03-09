import Dialog, { alert, warn } from '@/components/dialog';
import styles from './index.less';
import { useState } from 'react';

export default function () {
  const [visiable, setVisiable] = useState(true);
  return (
    <>
      <div className={styles['huangUI-dialog']}>
        <div
          onClick={() => {
            alert();
          }}
        >
          alert
        </div>
        <div
          onClick={() => {
            warn();
          }}
        >
          warn
        </div>
        <Dialog
          buttons={[<button>1</button>, <button>2</button>]}
          visiable={visiable}
          onClose={() => {
            setVisiable(!visiable);
          }}
        >
          <h1>123</h1>
        </Dialog>
      </div>
    </>
  );
}
