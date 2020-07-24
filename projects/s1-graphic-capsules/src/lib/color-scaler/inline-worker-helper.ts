export class InlineWorkerHelper {
  /**
   * Inline worker workaround of running web workers from within an Angular lib
   */
  static run(usrCode: (imgData: ImageData) => Promise<string[]>, imgData: ImageData) {
    const code = `const userProcedureFn = (${usrCode});
    self.onmessage = ({ data }) => {
      if (data.id !== 's1_color_scale') { return; }
      userProcedureFn(data.imgData).then((result) => {
      self.postMessage(result, null);
      })
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
