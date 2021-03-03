interface configType {
  width?: number;
  height?: number;
  lineWidth?: number;
}
interface thisType {
  context: any;
}
function Draw(
  this: thisType,
  canvas: any,
  degree: number,
  config?: configType,
) {
  console.log(this.context);
  if (!canvas) {
    console.log('warn');
    return;
  }
  const isMobile = /phone|pad|iPhone|ios|iPad|Android|Mobile/i.test(
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
  const real_canvas = canvas.current;
  let { width, height } = window.getComputedStyle(real_canvas, null);

  width = width.replace('px', '');
  height = height.replace('px', '');
  // let context = real_canvas.getContext('2d');
  this.context = real_canvas.getContext('2d');
  let context = this.context;
  // 根据设备像素比优化canvas绘图
  const devicePixelRatio = window.devicePixelRatio;
  if (devicePixelRatio) {
    real_canvas.style.width = `${config?.width || width}px`;
    real_canvas.style.height = `${config?.height || height}px`;
    real_canvas.height = Number(config?.height || height) * devicePixelRatio;
    real_canvas.width = Number(config?.width || width) * devicePixelRatio;
    context.scale(devicePixelRatio, devicePixelRatio);
  } else {
    real_canvas.width = config?.width || width;
    real_canvas.height = config?.height || height;
  }
  const { left, top } = real_canvas.getBoundingClientRect();
  context.lineWidth = config?.lineWidth || 6;
  context.strokeStyle = 'black';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  const paint = (signal: number) => {
    console.log(signal, 'signal');
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
    e.preventDefault();
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
}
Draw.prototype = {
  clear() {
    let width;
    let height;
    switch (this.degree) {
      case -90:
      case 90:
        width = this.height;
        height = this.width;
        break;
      default:
        width = this.width;
        height = this.height;
    }
    // this.context.clearRect(0, 0, width, height);
    console.log(this.context);
  },
};

export default Draw;
