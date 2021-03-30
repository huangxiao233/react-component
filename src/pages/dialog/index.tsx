import Dialog, { alert, warn, modal } from '@/components/dialog';
import styles from './index.less';

export default function () {
  const openModal = () => {
    const close = modal('123', [
      <button
        key="1"
        onClick={() => {
          close();
        }}
      >
        close
      </button>,
    ]);
  };
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
        <div onClick={openModal}>modal</div>
      </div>
    </>
  );
}
