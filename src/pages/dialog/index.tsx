import Dialog from '@/components/dialog';
import styles from './index.less';
import { useState } from 'react';

export default function () {
  const [visiable, setVisiable] = useState(true);
  return (
    <>
      <div className={styles.huangUI_dialog}>
        <div>显示</div>
        <Dialog
          visiable={visiable}
          close={() => {
            setVisiable(!visiable);
          }}
        />
      </div>
    </>
  );
}
