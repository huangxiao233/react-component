import Dialog from '@/components/dialog';
import styles from './index.less';
import { useState } from 'react';

export default function () {
  const [visiable, setVisiable] = useState(true);
  return (
    <>
      <div className={styles.huangUI_dialog}>
        <Dialog visiable={visiable} />
        <div
          onClick={() => {
            console.log(visiable, 'click');
            setVisiable(!visiable);
          }}
        >
          click
        </div>
      </div>
    </>
  );
}
