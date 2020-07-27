import * as quantizeNS from 'quantize';
const quantize = quantizeNS;
import { InlineWorkerHelper } from './inline-worker-helper';

/**
 * Gets the colors using color quantization algorithm imported from "quantize" lib
 * @param pixels
 * @param count
 */
export function _quantize(pixels: number[][], count: number = 4): number[][] {
  const colorMap = quantize(pixels, count);
  return colorMap.palette();
}

/**
 * Get The rgb from the image pixels
 * @param imgData
 * Returns an array of numeric arrays wrapped in a Promise
 */
export function getPixelsData(imgData: ImageData): Promise<number[][]> {
  const rgb = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    const r = imgData.data[i];
    const g = imgData.data[i + 1];
    const b = imgData.data[i + 2];
    rgb.push([r, g, b]);
  }
  return Promise.resolve(rgb);
}

/**
 * Loads an image from a given path and returns an ImageBitmap wrapped in a promise.
 * The ImageBitmap interface represents a bitmap image which can be drawn to a <canvas> without undue latency (MDN)
 * @param path
 */
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

/**
 * Invokes grabbing the colors of a given image and plucking the main colors as an output
 * @param img
 * @param count
 * Using a web Worker for the image processing
 * Returns an array of the main colors as rgb string wrapped in a Promise
 */
export function extractMainColorTask(img: ImageBitmap | HTMLImageElement, count: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const offscreenCanvas = new OffscreenCanvas(img.width, img.height);
        const ctx = offscreenCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);

        const worker: Worker = InlineWorkerHelper.run(getPixelsData, imageData);
        worker.onmessage = ({ data }) => {
          const colorScale = _quantize(data, count);
          const rgb = colorScale.map(([r, g, b]) => {
            return `rgb(${r},${g},${b})`;
          }, []);
          resolve(rgb);
          worker.terminate();
        };
      } catch (e) {
        reject(e);
      }
    })();
  });
}
