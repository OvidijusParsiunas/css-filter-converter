import { FilterToColorShared } from './shared';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as puppeteerType from 'puppeteer';

export class FilterToColorNode {
  private static TARGET_URL = 'http://localhost:3000';

  private static async getPuppeteerDependency(): Promise<{
    launch: (options?: { headless: boolean }) => puppeteerType.Browser;
  }> {
    try {
      // this is used to prevent webpack from evaluating the puppeteer module by adding dynamicity to the require path
      const pathPadding = '';
      // eslint-disable-next-line prefer-template
      return require('puppeteer' + pathPadding);
    } catch (e: unknown) {
      throw new Error(
        "ERROR: To generate color values from filter in Node - you will first need to install 'puppeteer' " +
          'by running: \n npm install puppeteer',
      );
    }
  }

  public static async generate(filter: string): Promise<string | null> {
    const puppeteer = await FilterToColorNode.getPuppeteerDependency();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // when headless mode is off - need to switch dimensions to 2 and the svg dimensions need to be set to 2
    const viewport = { width: 1, height: 1 };
    // selector does not work with versions + 6.0.0 and don't want to ask the user to install this particular version,
    //cespecially if they already have puppeteer installed
    await page.setViewport(viewport);
    await page.goto(FilterToColorNode.TARGET_URL);
    await page.evaluate(FilterToColorShared.addSVGElementsToDOM, filter);
    const endodedScreenshotData = await page.screenshot({ encoding: 'base64' });
    const byte64EncodedDataURL = `data:image/png;base64,${endodedScreenshotData}`;
    const result = await page.evaluate(FilterToColorShared.getColorViaImageByte64, byte64EncodedDataURL);
    browser.close();
    return result;
  }
}
