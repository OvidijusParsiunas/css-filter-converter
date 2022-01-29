import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { ColorToFilterResult } from '../../shared/types/result';
import { ColorFormats } from '../../shared/consts/colorFormats';
import { ColorTypes } from '../../shared/consts/colorTypes';
import { FilterToColorShared } from './shared';
import DomToImage from 'dom-to-image';

export class FilterToColorBrowser {
  private static cleanup(svgContainerElement: HTMLElement): void {
    svgContainerElement.remove();
  }

  private static finishProcessing(result: ColorToFilterResult, svgContainerElement: HTMLElement): ColorToFilterResult {
    FilterToColorBrowser.cleanup(svgContainerElement);
    return result;
  }

  private static async getImageByte64ViaSVG(svgContainerElement: HTMLElement): Promise<string> {
    const domToImage = (await import('dom-to-image')) as unknown as DomToImage;
    return domToImage.toPng(svgContainerElement);
  }

  public static async generate(filterString: string): Promise<ColorToFilterResult> {
    const { error, svgContainerElement } = FilterToColorShared.addSVGElementsToDOMAndValidateFilter(filterString);
    if (error) {
      const errorMesage = ErrorHandling.generateInputErrorMessage(ColorTypes.FILTER, filterString, ColorFormats.FILTER);
      const errorResult = ErrorHandling.generateErrorResult(errorMesage);
      return FilterToColorBrowser.finishProcessing(errorResult, svgContainerElement);
    }
    const byte64EncodedDataURL = await FilterToColorBrowser.getImageByte64ViaSVG(svgContainerElement);
    const hexColor = await FilterToColorShared.getColorViaImageDataURL(byte64EncodedDataURL);
    return FilterToColorBrowser.finishProcessing({ result: hexColor }, svgContainerElement);
  }
}
