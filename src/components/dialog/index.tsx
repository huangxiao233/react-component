import { scopeClassName } from '@/utils';
import './index.less';

interface Props {
  visiable: boolean;
}
const sc = scopeClassName('huangUI');

const Dialog: React.FunctionComponent<Props> = (props) => {
  return props.visiable ? (
    <>
      <div className={sc('mask')}></div>
      <div className={sc('dialogWapper')}>
        <header>1</header>
        <main>2</main>
        <footer>3</footer>
      </div>
    </>
  ) : null;
};
export default Dialog;
