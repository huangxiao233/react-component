import { useState } from 'react';
import styles from './index.less';
import { createFromIconfontCN } from '@ant-design/icons';

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2400517_6wx3ns3u52n.js', // 在 iconfont.cn 上生成
});
export default function Rating() {
  //分数显示
  const [rating, setRating] = useState(0);
  //鼠标移入
  const [selection, setSelection] = useState(0);
  const hoverOver = (event: any) => {
    if (event && event.target && event.target.getAttribute('star-id')) {
      let value = event.target.getAttribute('star-id');
      setSelection(value);
    }
  };
  const Star = (props: any) => {
    return (
      <span star-id={props.starId}>
        <MyIcon type={props.marked ? 'icon-star' : 'icon-star1'} />
      </span>
    );
  };
  return (
    <div
      className={styles.rating}
      onMouseOut={() => {
        hoverOver(null);
      }}
      onMouseOver={hoverOver}
      onClick={(event) => {
        console.log(
          event.target.parentNode.parentNode.parentNode.getAttribute('star-id'),
        );
        if (event && event.target) {
          let value = event.target.parentNode.parentNode.parentNode.getAttribute(
            'star-id',
          );
          setRating(value);
        }
      }}
    >
      {Array.from({ length: 5 }, (item, index: number) => {
        return (
          <Star
            marked={selection ? selection >= index + 1 : rating >= index + 1}
            starId={index + 1}
            key={`star_${index}`}
          />
        );
      })}
    </div>
  );
}
