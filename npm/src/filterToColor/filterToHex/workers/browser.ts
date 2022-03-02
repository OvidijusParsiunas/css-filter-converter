import { ErrorHandling } from '../../../shared/functionality/errorHandling/errorHandling';
import { ColorToFilterResult, FilterToColorResult } from '../../../shared/types/result';
import { FilterToHexShared } from './shared';
import DomToImage from 'dom-to-image';

export class FilterToHexBrowser extends FilterToHexShared {
  private static cleanup(svgContainerElement: HTMLElement): void {
    svgContainerElement.remove();
  }

  private static returnInputError(filterString: string, svgContainerElement: HTMLElement): ColorToFilterResult<null> {
    const errorMessage = FilterToHexShared.generateInputErrorMessage(filterString);
    const errorResult = ErrorHandling.generateErrorResult(errorMessage);
    FilterToHexBrowser.cleanup(svgContainerElement);
    return errorResult;
  }

  private static async getImageByte64ViaSVG(svgContainerElement: HTMLElement): Promise<string> {
    const domToImage = (await import('dom-to-image')) as unknown as DomToImage;
    return domToImage.toPng(svgContainerElement);
  }

  public static async convert<T>(filterString: string): Promise<FilterToColorResult<T>> {
    const { errorMessage, svgContainerElement } = FilterToHexShared.addSVGElementsToDOMAndValidateFilter(filterString);
    if (errorMessage) return FilterToHexBrowser.returnInputError(filterString, svgContainerElement);
    const byte64EncodedDataURL = await FilterToHexBrowser.getImageByte64ViaSVG(svgContainerElement);
    const hexColor = await FilterToHexShared.getColorViaImageDataURL(byte64EncodedDataURL);
    FilterToHexBrowser.cleanup(svgContainerElement);
    return { color: hexColor as unknown as T };
  }
}
