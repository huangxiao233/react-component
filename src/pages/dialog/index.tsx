import Dialog, { alert, warn } from '@/components/dialog';
import styles from './index.less';
import React, { useState } from 'react';

export default function () {
  return (
    <>
      <div className={styles['huangUI-dialog']}>
        <div
          onClick={() => {
            alert(
              '1',
              'hello',
              () => {
                console.log('yes');
              },
              () => {
                console.log('no');
              },
            );
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
      </div>
    </>
  );
}
