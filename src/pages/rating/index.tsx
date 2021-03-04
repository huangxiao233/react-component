import { EventHandler, useState } from 'react';
import styles from './index.less';

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
      <span star-id={props.starId}>{props.marked ? '\u2605' : '\u2606'}</span>
    );
  };
  return (
    <div
      className={styles.rating}
      onMouseOut={() => {
        hoverOver(null);
      }}
      onClick={(event) => {
        setRating(
          (event && event.target && event.target.getAttribute('star-id')) ||
            rating,
        );
      }}
      onMouseOver={hoverOver}
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
