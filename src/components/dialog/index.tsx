import { scopeClassName } from '@/utils';
import React, { Children, ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

interface Props {
  headerText?: String;
  cancelText?: String;
  enableClick?: Boolean | undefined; //点击MASK无用
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
          if (props.enableClick) return;
          maskClick();
        }}
      />
      <div className={sc('')}>
        <header className={sc('header')}>{props.headerText}</header>
        <main className={sc('main')}>{props.children}</main>
        <footer className={sc('footer')}>
          {props.buttons &&
            props.buttons.length > 0 &&
            props.buttons.map((button, index) => {
              return React.cloneElement(button, {
                key: index,
              });
            })}
        </footer>
      </div>
    </>
  );
  return ReactDOM.createPortal(result, document.body);
};

const modal = (
  content?: string,
  buttons?: Array<ReactElement>,
  headerText?: string,
  enableClick?: boolean,
) => {
  const close = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };

  const component = (
    <Dialog
      enableClick={enableClick}
      headerText={headerText}
      buttons={buttons}
      visiable={true}
      onClose={() => {
        close();
      }}
    >
      {content}
    </Dialog>
  );
  const div: any = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);
  return close;
};
const alert = (
  content: string,
  headerText: string,
  yes?: Function,
  no?: Function,
) => {
  const onYes = () => {
    close();
    yes && yes();
  };
  const onNo = () => {
    close();
    no && no();
  };
  const button = [
    <button onClick={onYes}>OK</button>,
    <button onClick={onNo}>No</button>,
  ];
  const close = modal(content, button, headerText);
};

const warn = (content?: string, headerText?: string) => {
  const enableClick = true;
  const button = [
    <button
      onClick={() => {
        close();
      }}
    >
      i konw
    </button>,
  ];
  const close = modal(
    content || 'warn',
    button,
    headerText || 'warn',
    enableClick,
  );
};

Dialog.defaultProps = {
  enableClick: false,
  cancelText: 'cancel',
  headerText: 'modal',
};
export { alert, warn };
export default Dialog;
