import * as quantize from 'quantize';
import { InlineWorkerHelper } from './inline-worker-helper';

export function getColors(pixels: number[][], count: number = 4): number[][] {
  const colorMap = quantize(pixels, count);
  return colorMap.palette();
}

export function getRgbFromImageData(imgData: ImageData): Promise<string[]> {
  const rgb = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    const r = imgData.data[i];
    const g = imgData.data[i + 1];
    const b = imgData.data[i + 2];
    rgb.push([r, g, b]);
  }
  return Promise.resolve(rgb);
}

export function loadImageBitmap(path: string): Promise<ImageBitmap> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = path;
    image.onload = async () => {
      resolve(await createImageBitmap(image));
    };
    image.onerror = (error) => reject(error);
  });
}

export function extractMainColorTask(img: ImageBitmap | HTMLImageElement, count: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const offscreenCanvas = new OffscreenCanvas(img.width, img.height);
        const ctx = offscreenCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);

        const worker = InlineWorkerHelper.run(getRgbFromImageData, imageData);
        worker.onmessage = ({ data }) => {
          const colorScale = getColors(data, count);
          const hex = colorScale.reduce((acc: string[], [r, g, b]) => {
            acc.push(`rgb(${r},${g},${b})`);
            return acc;
          }, []);
          resolve(hex);
          worker.terminate();
        };
      } catch (e) {
        reject(e);
      }
    })();
  });
}
