import { getColors, getColorTheme, getRgbFromImageData, loadImageBitmap, rgbToHex } from './utils';
import { Observable, Subject } from 'rxjs';
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

  public async getMainColorsTheme(count: number = 6, mode: Mode = 'light'): Promise<string[]> {
    const mainColors = await this.extractMainColors(count);
    return getColorTheme(mainColors, count, mode);
  }

  public getMainColorsTheme$(count: number = 6, mode: Mode = 'light'): Observable<string[]> {
    const subject: Subject<string[]> = new Subject();
    this.getMainColorsTheme(count)
      .then((themeScale) => subject.next(themeScale))
      .catch((err) => subject.error(err));
    return subject.asObservable();
  }

  public getMainColorsScale(count: number = 6): Promise<string[]> {
    return this.extractMainColors(count);
  }

  public getMainColorsScale$(count: number = 6): Observable<string[]> {
    const subject: Subject<string[]> = new Subject();
    this.getMainColorsScale(count)
      .then((colors) => subject.next(colors))
      .catch((err) => subject.error(err));
    return subject.asObservable();
  }

  private async extractMainColors(count: number = 6): Promise<string[]> {
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
              acc.push(rgbToHex(r, b, g));
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
