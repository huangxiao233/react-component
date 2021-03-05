import { scopeClassName } from '@/utils';
import './index.less';

interface Props {
  visiable: boolean;
  close: Function;
}
const sc = scopeClassName('huangUI');

const Dialog: React.FunctionComponent<Props> = (props) => {
  return props.visiable ? (
    <>
      <div
        className={sc('mask')}
        onClick={() => {
          props.close();
        }}
      ></div>
      <div className={sc('dialogWapper')}>
        <header>提示</header>
        <main>主要内容</main>
        <footer>脚部</footer>
      </div>
    </>
  ) : null;
};
export default Dialog;
