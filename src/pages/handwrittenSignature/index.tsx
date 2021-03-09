import HandwrittenSignaturePage, {
  canvas2png,
  download,
  clearAll,
  dataURL2File,
} from '@/components/handWrittenSignature';

export default function () {
  return (
    <>
      <button
        onClick={() => {
          clearAll();
        }}
      >
        清除
      </button>
      <button
        onClick={() => {
          const base64URL = canvas2png();
          download(base64URL!);
        }}
      >
        下载
      </button>
      <HandwrittenSignaturePage width={300} height={300} />
    </>
  );
}
