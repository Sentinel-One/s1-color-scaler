export class InlineWorkerHelper {
  /**
   * Inline worker workaround of running web workers from within an Angular lib
   * @param usrCode
   * @param usrParams
   */
  // <P>(param: T[]) => Promise<P>
  // tslint:disable-next-line:ban-types
  static run<T>(usrCode: Function, usrParams?: T[]) {
    const code = `const userProcedureFn = (${usrCode});
    self.onmessage = ({ data }) => {
      if (data.id !== 's1_color_scale') { return; }
      userProcedureFn(data.usrParams).then((result) => {
      self.postMessage(result, null);
      })
  };`;

    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    worker.postMessage({
      id: 's1_color_scale',
      usrParams: [...usrParams],
    });
    return worker;
  }
}
