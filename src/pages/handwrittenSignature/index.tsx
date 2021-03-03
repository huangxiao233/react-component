import styles from './index.less';
import { useEffect, useRef, useState, useCallback } from 'react';

interface canvasPros {
  width: number;
  height: number;
}
type Coordinate = {
  x: number;
  y: number;
};

const HandwrittenSignaturePage = ({ width, height }: canvasPros) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setisPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );
  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    console.log(coordinates, 'start');
    if (coordinates) {
      setisPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      console.log(isPainting, 'isPainting');
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        console.log(mousePosition, newMousePosition, isPainting, 'move');
        if (mousePosition && newMousePosition) {
          darwLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition],
  );

  const exitPaint = useCallback(() => {
    console.log('exit');
    setisPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas?.addEventListener('mousedown', startPaint);
    return () => {
      canvas?.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  useEffect(() => {
    if (!canvasRef) return;
    const canvas = canvasRef.current;
    canvas?.addEventListener('mousemove', paint);
    return () => {
      canvas?.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  useEffect(() => {
    if (!canvasRef) return;
    const canvas = canvasRef.current;
    canvas?.addEventListener('mouseup', exitPaint);
    canvas?.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas?.removeEventListener('mouseup', exitPaint);
      canvas?.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const darwLine = (oldPostion: Coordinate, newPosition: Coordinate) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    console.log('drawline1');
    if (context) {
      console.log('drawline2');
      context.lineWidth = 6;
      context.strokeStyle = 'black';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      context.beginPath();
      context.moveTo(oldPostion.x, oldPostion.y);
      context.lineTo(newPosition.x, newPosition.y);
      context.closePath();
      context.stroke();
    }
  };

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const { left, top } = canvas.getBoundingClientRect();
    return {
      x: event.clientX - left,
      y: event.clientY - top,
    };
  };

  return (
    <div className={styles.signature}>
      <canvas ref={canvasRef} height={height} width={width}></canvas>
    </div>
  );
};

// HandwrittenSignaturePage.defaultProps = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };
export default HandwrittenSignaturePage;
