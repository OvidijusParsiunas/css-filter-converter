import { ErrorHandling } from '../../../shared/functionality/errorHandling/errorHandling';
import { ColorToFilterResult, FilterToColorResult } from '../../../shared/types/result';
import { MUST_INSTALL_PUPPETEER } from '../../../shared/consts/errors';
import { ColorFormats } from '../../../shared/consts/colorFormats';
import { ColorTypes } from '../../../shared/consts/colorTypes';
import { FilterToHexShared, SVGAddResult } from './shared';
import { Error } from '../../../shared/types/error';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Puppeteer from 'puppeteer';

export class FilterToHexNode extends FilterToHexShared {
  private static readonly BASE_64_ENCODING = 'base64';

  private static readonly ENCODED_DATA_URL_PREFIX = `data:image/png;${FilterToHexNode.BASE_64_ENCODING},`;

  private static readonly IS_HEADLESS = true;

  // 1px SVG/viewport length is not enough to take a screenshot when headless mode is off, hence it is set to 2px
  private static readonly SVG_SIDE_LENGTH_PX = 2;

  private static cleanup(browser?: Puppeteer.Browser): void {
    if (FilterToHexNode.IS_HEADLESS) browser?.close();
  }

  private static returnError(errorMsg: string, browser?: Puppeteer.Browser): ColorToFilterResult<null> {
    const errorResult = ErrorHandling.generateErrorResult(errorMsg);
    FilterToHexNode.cleanup(browser);
    return errorResult;
  }

  private static async getImageBase64ViaSVG(page: Puppeteer.Page): Promise<string> {
    const endodedScreenshotData = await page.screenshot({ encoding: FilterToHexNode.BASE_64_ENCODING });
    return `${FilterToHexNode.ENCODED_DATA_URL_PREFIX}${endodedScreenshotData}`;
  }

  private static async openBrowserPage(browser: Puppeteer.Browser): Promise<Puppeteer.Page> {
    const page = await browser.newPage();
    await page.setViewport({
      width: FilterToHexNode.SVG_SIDE_LENGTH_PX,
      height: FilterToHexNode.SVG_SIDE_LENGTH_PX,
    });
    return page;
  }

  private static async addSVGAndValidateFilter(page: Puppeteer.Page, filterString: string): Promise<SVGAddResult | Error> {
    const svgAddResult = await page.evaluate(
      FilterToHexShared.addSVGElementsToDOMAndValidateFilter,
      filterString,
      FilterToHexNode.SVG_SIDE_LENGTH_PX,
    );
    if (svgAddResult.errorMessage) {
      return {
        errorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.FILTER, filterString, ColorFormats.FILTER),
      };
    }
    return svgAddResult;
  }

  private static async getPuppeteerDependency(): Promise<Puppeteer.PuppeteerNode | Error> {
    try {
      // this is used to prevent tsc from evaluating the puppeteer module by adding dynamicity to the require path
      const pathPadding = '';
      // eslint-disable-next-line prefer-template
      return require('puppeteer' + pathPadding);
    } catch (e: unknown) {
      return { errorMessage: MUST_INSTALL_PUPPETEER };
    }
  }

  private static async preparePuppeteerBrowser(): Promise<Puppeteer.Browser | Error> {
    const puppeteer = await FilterToHexNode.getPuppeteerDependency();
    console.log('preparing to launch');
    if (ErrorHandling.hasError(puppeteer)) return puppeteer;
    console.log('launched!!');
    return puppeteer.launch({ headless: FilterToHexNode.IS_HEADLESS });
  }

  // puppeteer versions higher than 6.0.0 have a bug where the view blinks when taking a screnshot of a specific
  // element, hence in order to not have to force the user to install a specific version of puppeteer (especially if
  // they are already using it for another use-case), the logic here is configured to reduce the viewport to the svg
  // size and then proceed to take a screenshot of the viewport via the page.screenshot api
  public static async convert<T>(filterString: string): Promise<FilterToColorResult<T>> {
    const browser = await FilterToHexNode.preparePuppeteerBrowser();
    if (ErrorHandling.hasError(browser)) return FilterToHexNode.returnError(browser.errorMessage);
    const page = await FilterToHexNode.openBrowserPage(browser);
    const addSvgResult = await FilterToHexNode.addSVGAndValidateFilter(page, filterString);
    if (ErrorHandling.hasError(addSvgResult)) return FilterToHexNode.returnError(addSvgResult.errorMessage, browser);
    const base64EncodedDataURL = await FilterToHexNode.getImageBase64ViaSVG(page);
    const hexColor = await page.evaluate(FilterToHexShared.getColorViaImageDataURL, base64EncodedDataURL);
    FilterToHexNode.cleanup(browser);
    return { color: hexColor as unknown as T };
  }
}
