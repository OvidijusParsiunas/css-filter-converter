import { FilterToColorShared } from './shared';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as puppeteerType from 'puppeteer';

export class FilterToColorNode {
  private static readonly TARGET_URL = 'http://localhost:3000';

  private static readonly BASE_64_ENCODING = 'base64';

  private static readonly ENCODED_DATA_URL_PREFIX = `data:image/png;${FilterToColorNode.BASE_64_ENCODING},`;

  private static readonly IS_HEADLESS = true;

  // when headless mode is off, switch dimensions to 2 pixels for browser to be able to take a screenshot
  private static readonly SVG_SIDE_LENGTH_PX = FilterToColorNode.IS_HEADLESS ? 1 : 2;

  private static async getImageByte64ViaSVG(page: puppeteerType.Page): Promise<string> {
    const endodedScreenshotData = await page.screenshot({ encoding: FilterToColorNode.BASE_64_ENCODING });
    return `${FilterToColorNode.ENCODED_DATA_URL_PREFIX}${endodedScreenshotData}`;
  }

  private static async goToPage(browser: puppeteerType.Browser): Promise<puppeteerType.Page> {
    const viewport = { width: FilterToColorNode.SVG_SIDE_LENGTH_PX, height: FilterToColorNode.SVG_SIDE_LENGTH_PX };
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(FilterToColorNode.TARGET_URL);
    return page;
  }

  private static async getPuppeteerDependency(): Promise<puppeteerType.PuppeteerNode> {
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

  private static async preparePuppeteerBrowser(): Promise<puppeteerType.Browser> {
    const puppeteer = await FilterToColorNode.getPuppeteerDependency();
    return puppeteer.launch({ headless: FilterToColorNode.IS_HEADLESS });
  }

  // selector does not work with versions + 6.0.0 and don't want to ask the user to install this particular version,
  // especially if they already have puppeteer installed
  public static async generate(filter: string): Promise<string> {
    const browser = await FilterToColorNode.preparePuppeteerBrowser();
    const page = await FilterToColorNode.goToPage(browser);
    await page.evaluate(FilterToColorShared.addSVGElementsToDOM, filter, FilterToColorNode.SVG_SIDE_LENGTH_PX);
    const byte64EncodedDataURL = await FilterToColorNode.getImageByte64ViaSVG(page);
    const hexColor = await page.evaluate(FilterToColorShared.getColorViaImageDataURL, byte64EncodedDataURL);
    if (FilterToColorNode.IS_HEADLESS) browser.close();
    return hexColor;
  }
}