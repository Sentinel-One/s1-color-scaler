import * as quantize from 'quantize';
import * as chroma from 'chroma-js';
import { Mode } from './s1-color-scaler';

export function getColors(pixels: number[][], count): number[][] {
  const colorMap = quantize(pixels, count);
  return colorMap.palette();
}

export function rgbToHex(r: number, g: number, b: number): string {
  let red = r.toString(16);
  let green = g.toString(16);
  let blue = b.toString(16);
  if (red.length === 1) {
    red = `0${red}`;
  }
  if (green.length === 1) {
    green = `0${green}`;
  }
  if (blue.length === 1) {
    blue = `0${blue}`;
  }
  return `#${red}${green}${blue}`;
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

export function getColorTheme(range: string[], count = 6, mode: Mode = 'light'): string[] {
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
