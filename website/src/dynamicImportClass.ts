import { Browser } from './browser';
import { Node } from './node';

export class DynamicImportClass {
  public static import() {
    const var2 = 1;
    if (var2 === 1) {
      Browser.import();
    } else {
      console.log('called');
      Node.import();
    }
  }
}
