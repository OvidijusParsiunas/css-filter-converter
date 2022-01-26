import Browser from './browser';

export default class DynamicImportClass {
  public static import() {
    const var2 = 1;
    if (var2 === 1) {
      Browser.import();
    }
  }
}
