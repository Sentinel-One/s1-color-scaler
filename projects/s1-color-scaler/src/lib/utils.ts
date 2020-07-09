import * as quantize from 'quantize';
import * as chroma from 'chroma-js';
import { Mode } from './s1-color-scaler';

export function getColors(pixels: number[][], count: number = 4): number[][] {
  const colorMap = quantize(pixels, count);
  const p = colorMap.palette();
  console.log(p);
  return p;
}

export function getRgbFromImageData([imgData]): Promise<string[]> {
  const rgb = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    const r = imgData.data[i];
    const g = imgData.data[i + 1];
    const b = imgData.data[i + 2];
    rgb.push([r, g, b]);
  }
  return Promise.resolve(rgb);
}

export function getColorTheme(range: string[], count = 6, mode: Mode = 'dark'): string[] {
  const color = mode === 'dark' ? '#000000' : '#ffffff';
  return chroma
    .scale([color, ...range])
    .mode('rgb')
    .colors(count);
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
