import { scopeClassName } from '@/utils';
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

interface Props {
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
        <header className={sc('header')}>提示</header>
        <main className={sc('main')}>{props.children}</main>
        <footer className={sc('footer')}>
          {props.buttons?.map((button, index) => {
            return React.cloneElement(button, { key: index });
          })}
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
    // 如果没有这一句,div 会愈来越多
    div.remove();
  };

  const component = (
    <Dialog
      visiable={true}
      onClose={() => {
        close();
      }}
    />
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
      invalidClick={true}
      visiable={true}
      onClose={() => {
        close();
      }}
    />
  );
  const div: any = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);
};
Dialog.defaultProps = {
  invalidClick: false,
};
export { alert, warn };
export default Dialog;
