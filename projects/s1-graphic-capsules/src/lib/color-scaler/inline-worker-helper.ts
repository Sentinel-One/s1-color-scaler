// Workaround to https://github.com/angular/angular-cli/issues/15059
// Ensures the worker will be loaded from the same origin
// No xss risk as the usrCode is a function passed by this specific worker user:
// InlineWorkerHelper.run(getPixelsData, imageData)
export class InlineWorkerHelper {
  /**
   * Inline worker workaround of running web workers from within an Angular lib
   * Returns an instance of the worker
   */
  static run(usrCode: (imgData: ImageData) => Promise<number[][]>, imgData: ImageData): Worker {
    if (!(usrCode instanceof Function)) {
      return;
    }
    const code = `const userProcedureFn = ${usrCode};
    self.onmessage = ({ data }) => {
      if (data.id !== 's1_color_scale') { return; }
      userProcedureFn(data.imgData).then(result => self.postMessage(result, null))
  };`;

    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    worker.postMessage({
      id: 's1_color_scale',
      imgData,
    });
    return worker;
  }
}
