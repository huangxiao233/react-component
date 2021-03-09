import { scopeClassName } from '@/utils';
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

interface Props {
  headerText?: String;
  cancelText?: String;
  invalidClick?: Boolean; //点击MASK无用
  visiable: Boolean;
  onClose: Function;
  buttons?: Array<ReactElement>;
}
const sc = scopeClassName('huangUI-dialog');

const Dialog: React.FunctionComponent<Props> = (props) => {
  const maskClick = () => {
    props.onClose();
  };

  const result = props.visiable && (
    <>
      <div
        className={sc('mask')}
        onClick={() => {
          if (props.invalidClick) return;
          maskClick();
        }}
      />
      <div className={sc('')}>
        <header className={sc('header')}>{props.headerText}</header>
        <main className={sc('main')}>{props.children}</main>
        <footer className={sc('footer')}>
          {props.buttons ? (
            props.buttons.map((button, index) => {
              return React.cloneElement(button, {
                key: index,
              });
            })
          ) : (
            <button
              onClick={() => {
                props.onClose();
              }}
            >
              {props.cancelText}
            </button>
          )}
        </footer>
      </div>
    </>
  );
  return ReactDOM.createPortal(result, document.body);
};

const alert = () => {
  const close = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };
  const confirmCallBack = () => {};

  const component = (
    <Dialog
      headerText="confirm"
      buttons={[
        <button
          onClick={() => {
            close();
          }}
        >
          cancel
        </button>,
        <button
          onClick={() => {
            close();
          }}
          style={{ marginLeft: '10px' }}
        >
          confirm
        </button>,
      ]}
      visiable={true}
      onClose={() => {
        close();
      }}
    >
      <h1>{'confirm'}</h1>
    </Dialog>
  );
  const div: any = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);
};

const warn = () => {
  const close = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div);
    // 如果没有这一句,div 会愈来越多
    div.remove();
  };

  const component = (
    <Dialog
      headerText="warn"
      invalidClick={true}
      visiable={true}
      onClose={() => {
        close();
      }}
    >
      <h1>{'waring'}</h1>
    </Dialog>
  );
  const div: any = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);
};
Dialog.defaultProps = {
  invalidClick: false,
  cancelText: 'cancel',
  headerText: 'modal',
};
export { alert, warn };
export default Dialog;
