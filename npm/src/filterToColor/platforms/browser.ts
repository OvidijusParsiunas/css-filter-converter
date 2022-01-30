import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { ColorToFilterResult } from '../../shared/types/result';
import { FilterToColorShared } from './shared';
import DomToImage from 'dom-to-image';

export class FilterToColorBrowser extends FilterToColorShared {
  private static cleanup(svgContainerElement: HTMLElement): void {
    svgContainerElement.remove();
  }

  private static finishProcessing(result: ColorToFilterResult, svgContainerElement: HTMLElement): ColorToFilterResult {
    FilterToColorBrowser.cleanup(svgContainerElement);
    return result;
  }

  private static returnInputError(filterString: string, svgContainerElement: HTMLElement): ColorToFilterResult {
    const errorMessage = FilterToColorShared.generateInputErrorMessage(filterString);
    const errorResult = ErrorHandling.generateErrorResult(errorMessage);
    return FilterToColorBrowser.finishProcessing(errorResult, svgContainerElement);
  }

  private static async getImageByte64ViaSVG(svgContainerElement: HTMLElement): Promise<string> {
    const domToImage = (await import('dom-to-image')) as unknown as DomToImage;
    return domToImage.toPng(svgContainerElement);
  }

  public static async generate(filterString: string): Promise<ColorToFilterResult> {
    const { errorMessage, svgContainerElement } = FilterToColorShared.addSVGElementsToDOMAndValidateFilter(filterString);
    if (errorMessage) return FilterToColorBrowser.returnInputError(filterString, svgContainerElement);
    const byte64EncodedDataURL = await FilterToColorBrowser.getImageByte64ViaSVG(svgContainerElement);
    const hexColor = await FilterToColorShared.getColorViaImageDataURL(byte64EncodedDataURL);
    return FilterToColorBrowser.finishProcessing({ color: hexColor }, svgContainerElement);
  }
}
