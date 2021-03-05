import styles from './index.less';
import { useEffect, useRef, useState, useCallback } from 'react';

interface canvasPros {
  width: number;
  height: number;
  lineWidth: number;
}
interface Coordinate {
  x: number;
  y: number;
}

const HandwrittenSignaturePage = ({ width, height, lineWidth }: canvasPros) => {
  const [color, setColor] = useState('balck');
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
    if (context) {
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
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

  const clearAll = (width: number, height: number) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      console.log(width, height, 'clear');
      context.clearRect(0, 0, width, height);
    }
  };

  const clear = useCallback(() => {
    clearAll(width, height);
  }, [width, height]);

  const canvas2png = () => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    return canvas.toDataURL('image/png');
  };
  const canvas2img = () => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    return canvas.toDataURL('image/jpeg');
  };

  const download = (base64: string) => {
    const url = base64.replace(
      'image/png',
      'image/octet-stream;Content-Disposition:attachment;filename=test.png',
    );
    window.location.href = url;
  };

  const dataURL2File = (base64URL: string, fileName: string) => {
    const arr = base64URL.split(',');
    const mime = arr[0];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    console.log(new File([u8arr], fileName, { type: mime }), '12123123');
    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div className={styles.signature}>
      <button
        onClick={() => {
          clear();
        }}
      >
        清除
      </button>

      <button
        onClick={() => {
          canvas2png();
        }}
      >
        PNG
      </button>
      <button
        onClick={() => {
          const base64url = canvas2png();
          download(base64url!);
        }}
      >
        download
      </button>
      <button
        onClick={() => {
          const base64url = canvas2png();
          dataURL2File(base64url!, 'test');
        }}
      >
        FILE
      </button>
      <button
        onClick={() => {
          setColor('red');
        }}
      >
        red
      </button>
      <button
        onClick={() => {
          setColor('black');
        }}
      >
        black
      </button>
      <button
        onClick={() => {
          setColor('blue');
        }}
      >
        blue
      </button>

      <canvas ref={canvasRef} height={height} width={width}></canvas>
    </div>
  );
};

HandwrittenSignaturePage.defaultProps = {
  width: 200,
  height: 200,
  lineWidth: 5,
};
export default HandwrittenSignaturePage;
