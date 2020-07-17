import { getColors, getColorTheme, getRgbFromImageData, loadImageBitmap } from './utils';
import { defer, Observable } from 'rxjs';
import { InlineWorkerHelper } from './inline-worker-helper';

export type Mode = 'dark' | 'light';

export class S1ColorScaler {
  readonly imgPath: string;

  constructor(imagePath: string) {
    this.imgPath = imagePath;
  }

  public static from(imgPath: string) {
    return new S1ColorScaler(imgPath);
  }

  public async getMainColorsTheme(count: number = 6, mode: Mode = 'dark'): Promise<string[]> {
    const mainColors = await this.extractMainColors(count);
    return getColorTheme(mainColors, count, mode);
  }

  public getMainColorsTheme$(count: number = 6, mode: Mode = 'dark'): Observable<string[]> {
    return defer(() => this.getMainColorsTheme(count));
  }

  public getMainColorsScale(count: number = 4): Promise<string[]> {
    return this.extractMainColors(count);
  }

  public getMainColorsScale$(count: number = 6): Observable<string[]> {
    return defer(() => this.getMainColorsScale(count));
  }

  private async extractMainColors(count: number = 4): Promise<string[]> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const imageBitmap = await loadImageBitmap(this.imgPath);
          const offscreenCanvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
          const ctx = offscreenCanvas.getContext('2d');
          ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);
          const imageData = ctx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);

          const worker = InlineWorkerHelper.run(getRgbFromImageData, [imageData]);
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
}
