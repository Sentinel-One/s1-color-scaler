import { extractMainColorTask, loadImageBitmap } from './utils';
import { defer, Observable } from 'rxjs';

export class S1ColorScaler {
  readonly imgPath: string;

  constructor(imagePath: string) {
    this.imgPath = imagePath;
  }

  /**
   * S1ColorScaler factory fn
   * @param imgPath
   */
  public static from(imgPath: string) {
    return new S1ColorScaler(imgPath);
  }
  /**
   * A util function for extracting the main colors of an image
   * @param imgPath
   * @param count - colors count
   */
  static async extractMainColors(imgPath: string, count: number = 4): Promise<string[]> {
    const imageBitmap = await loadImageBitmap(imgPath);
    return extractMainColorTask(imageBitmap, count);
  }
  /**
   * Get a scale of the main colors of a given image
   * @param count
   */
  public getMainColorsScale(count: number = 4): Promise<string[]> {
    return S1ColorScaler.extractMainColors(this.imgPath, count);
  }
  /**
   * Gets the main/dominant color of an image
   */
  public async getMainColor(): Promise<string> {
    const colors = await S1ColorScaler.extractMainColors(this.imgPath, 2);
    return colors[0];
  }
  /**
   * Gets the main/dominant color of an image
   */
  public getMainColor$(): Observable<string> {
    return defer(() => this.getMainColor());
  }
  /**
   * Get a scale of the main colors of a given image
   */
  public getMainColorsScale$(count: number = 6): Observable<string[]> {
    return defer(() => this.getMainColorsScale(count));
  }
}
