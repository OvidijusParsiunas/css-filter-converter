import { ColorToFilterResult, FilterToColorResult } from '../../shared/types/result';
import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { MUST_INSTALL_PUPPETEER } from '../../shared/consts/errors';
import { ColorFormats } from '../../shared/consts/colorFormats';
import { FilterToColorShared, SVGAddResult } from './shared';
import { ColorTypes } from '../../shared/consts/colorTypes';
import { Error } from '../../shared/types/error';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Puppeteer from 'puppeteer';

type ObjctsWithError = Puppeteer.PuppeteerNode | Puppeteer.Browser | SVGAddResult;

export class FilterToColorNode extends FilterToColorShared {
  private static readonly BASE_64_ENCODING = 'base64';

  private static readonly ENCODED_DATA_URL_PREFIX = `data:image/png;${FilterToColorNode.BASE_64_ENCODING},`;

  private static readonly IS_HEADLESS = true;

  // 1px SVG/viewport length is not enough to take a screenshot when headless mode is off, hence it is set to 2px
  private static readonly SVG_SIDE_LENGTH_PX = 2;

  private static finishProcessing(result: ColorToFilterResult, browser?: Puppeteer.Browser): ColorToFilterResult {
    if (FilterToColorNode.IS_HEADLESS) browser?.close();
    return result;
  }

  private static returnError(errorMsg: string, browser?: Puppeteer.Browser): ColorToFilterResult {
    const errorResult = ErrorHandling.generateErrorResult(errorMsg);
    return FilterToColorNode.finishProcessing(errorResult, browser);
  }

  private static hasError(param: ObjctsWithError | Error): param is Error {
    return !!(param as Error).errorMessage;
  }

  private static async getImageByte64ViaSVG(page: Puppeteer.Page): Promise<string> {
    const endodedScreenshotData = await page.screenshot({ encoding: FilterToColorNode.BASE_64_ENCODING });
    return `${FilterToColorNode.ENCODED_DATA_URL_PREFIX}${endodedScreenshotData}`;
  }

  private static async openBrowserPage(browser: Puppeteer.Browser): Promise<Puppeteer.Page> {
    const page = await browser.newPage();
    await page.setViewport({
      width: FilterToColorNode.SVG_SIDE_LENGTH_PX,
      height: FilterToColorNode.SVG_SIDE_LENGTH_PX,
    });
    return page;
  }

  private static async addSVGAndValidateFilter(page: Puppeteer.Page, filterString: string): Promise<SVGAddResult | Error> {
    const svgAddResult = await page.evaluate(
      FilterToColorShared.addSVGElementsToDOMAndValidateFilter,
      filterString,
      FilterToColorNode.SVG_SIDE_LENGTH_PX,
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
      // this is used to prevent webpack from evaluating the puppeteer module by adding dynamicity to the require path
      const pathPadding = '';
      // eslint-disable-next-line prefer-template
      return require('puppeteer' + pathPadding);
    } catch (e: unknown) {
      return { errorMessage: MUST_INSTALL_PUPPETEER };
    }
  }

  private static async preparePuppeteerBrowser(): Promise<Puppeteer.Browser | Error> {
    const puppeteer = await FilterToColorNode.getPuppeteerDependency();
    if (this.hasError(puppeteer)) return puppeteer;
    return puppeteer.launch({ headless: FilterToColorNode.IS_HEADLESS });
  }

  // puppeteer versions higher than 6.0.0 have a bug where the view blinks when taking a screnshot of a specific
  // element, hence in order to not have to force the user to install a specific version of puppeteer (especially if
  // they are already using it for another use-case), the logic here is configured to reduce the viewport to the svg
  // size and then proceed to take a screenshot of the viewport via the page.screenshot api
  public static async generate(filterString: string): Promise<FilterToColorResult> {
    const browser = await FilterToColorNode.preparePuppeteerBrowser();
    if (this.hasError(browser)) return FilterToColorNode.returnError(browser.errorMessage);
    const page = await FilterToColorNode.openBrowserPage(browser);
    const addSvgResult = await FilterToColorNode.addSVGAndValidateFilter(page, filterString);
    if (this.hasError(addSvgResult)) return FilterToColorNode.returnError(addSvgResult.errorMessage, browser);
    const byte64EncodedDataURL = await FilterToColorNode.getImageByte64ViaSVG(page);
    const hexColor = await page.evaluate(FilterToColorShared.getColorViaImageDataURL, byte64EncodedDataURL);
    return FilterToColorNode.finishProcessing({ color: hexColor }, browser);
  }
}
