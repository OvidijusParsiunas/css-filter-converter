import Browser from './browser';
import { Node } from './node';

export default class DynamicImportClass {
  public static import() {
    const var2 = 1;
    if (var2 === 1) {
      Browser.import();
    } else {
      Node.import();
    }
  }
}
