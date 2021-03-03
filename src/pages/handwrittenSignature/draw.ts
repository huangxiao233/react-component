import { ForwardRefRenderFunction, MutableRefObject } from 'react';

const Draw = (canvas: any, degree: number) => {
  if (!canvas) {
    console.log('warn');
    return;
  }
  const isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(
    navigator.userAgent,
  );
  interface pointObject {
    y: number;
    x: number;
  }
  let point: pointObject = {
    x: 0,
    y: 0,
  };
  let pressed = false;
  let real_canvas = canvas.current;
  let { width, height } = window.getComputedStyle(real_canvas, null);
  const { left, top } = real_canvas.getBoundingClientRect();
  width = width.replace('px', '');
  height = height.replace('px', '');
  let context = real_canvas.getContext('2d');
  // 根据设备像素比优化canvas绘图
  const devicePixelRatio = window.devicePixelRatio;
  if (devicePixelRatio) {
    real_canvas.style.width = `${width}px`;
    real_canvas.style.height = `${height}px`;
    real_canvas.height = Number(height) * devicePixelRatio;
    real_canvas.width = Number(width) * devicePixelRatio;
    context.scale(devicePixelRatio, devicePixelRatio);
  } else {
    real_canvas.width = width;
    real_canvas.height = height;
  }

  context.lineWidth = 6;
  context.strokeStyle = 'black';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  const paint = (signal: number) => {
    switch (signal) {
      case 1:
        context.beginPath();
        context.moveTo(point.x, point.y);
      case 2:
        context.lineTo(point.x, point.y);
        context.stroke();
        break;
      default:
    }
  };

  const create = (signal: number) => (e: any) => {
    console.log(signal, 'signal');
    if (signal === 1) {
      pressed = true;
    }

    if (signal === 1 || pressed) {
      e = isMobile
        ? e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
        : e;
      point.y = e.clientY - top;
      point.x = e.clientX - left;
      paint(signal);
    }
    // if (signal === 1 || pressed) {
    //   paint(signal);
    // }
  };
  const start = create(1);
  const move = create(2);
  const requestAnimationFrame = window.requestAnimationFrame;
  const optimizedMove = requestAnimationFrame
    ? (e: any) => {
        requestAnimationFrame(() => {
          move(e);
        });
      }
    : move;

  if (isMobile) {
    real_canvas.addEventListener('touchstart', (e: any) => {
      console.log('mobile');
      start(e);
    });
    real_canvas.addEventListener('touchmove', optimizedMove);
  } else {
    real_canvas.addEventListener('mousedown', (e: any) => {
      console.log('pc');
      start(e);
    });
    real_canvas.addEventListener('mousemove', optimizedMove);
    ['mouseup', 'mouseleave'].forEach((event) => {
      real_canvas.addEventListener(event, () => {
        pressed = false;
      });
    });
  }
};

export default Draw;
