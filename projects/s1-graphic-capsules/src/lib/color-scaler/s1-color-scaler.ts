import { extractMainColorTask, loadImageBitmap } from './utils';
import { defer, Observable } from 'rxjs';

export class S1ColorScaler {
  readonly imgPath: string;

  constructor(imagePath: string) {
    this.imgPath = imagePath;
  }

  public static from(imgPath: string) {
    return new S1ColorScaler(imgPath);
  }

  static async extractMainColors(imgPath: string, count: number = 4): Promise<string[]> {
    const imageBitmap = await loadImageBitmap(imgPath);
    return extractMainColorTask(imageBitmap, count);
  }

  public getMainColorsScale(count: number = 4): Promise<string[]> {
    return S1ColorScaler.extractMainColors(this.imgPath, count);
  }

  public async getMainColor(): Promise<string> {
    const colors = await S1ColorScaler.extractMainColors(this.imgPath, 2);
    return colors[0];
  }

  public getMainColor$(): Observable<string> {
    return defer(() => this.getMainColor());
  }

  public getMainColorsScale$(count: number = 6): Observable<string[]> {
    return defer(() => this.getMainColorsScale(count));
  }
}
