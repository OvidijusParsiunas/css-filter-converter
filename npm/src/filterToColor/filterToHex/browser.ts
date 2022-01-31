import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { ColorToFilterResult } from '../../shared/types/result';
import { FilterToHexShared } from './shared';
import DomToImage from 'dom-to-image';

export class FilterToHexBrowser extends FilterToHexShared {
  private static cleanup(svgContainerElement: HTMLElement): void {
    svgContainerElement.remove();
  }

  private static finishProcessing(result: ColorToFilterResult, svgContainerElement: HTMLElement): ColorToFilterResult {
    FilterToHexBrowser.cleanup(svgContainerElement);
    return result;
  }

  private static returnInputError(filterString: string, svgContainerElement: HTMLElement): ColorToFilterResult {
    const errorMessage = FilterToHexShared.generateInputErrorMessage(filterString);
    const errorResult = ErrorHandling.generateErrorResult(errorMessage);
    return FilterToHexBrowser.finishProcessing(errorResult, svgContainerElement);
  }

  private static async getImageByte64ViaSVG(svgContainerElement: HTMLElement): Promise<string> {
    const domToImage = (await import('dom-to-image')) as unknown as DomToImage;
    return domToImage.toPng(svgContainerElement);
  }

  public static async convert(filterString: string): Promise<ColorToFilterResult> {
    const { errorMessage, svgContainerElement } = FilterToHexShared.addSVGElementsToDOMAndValidateFilter(filterString);
    if (errorMessage) return FilterToHexBrowser.returnInputError(filterString, svgContainerElement);
    const byte64EncodedDataURL = await FilterToHexBrowser.getImageByte64ViaSVG(svgContainerElement);
    const hexColor = await FilterToHexShared.getColorViaImageDataURL(byte64EncodedDataURL);
    return FilterToHexBrowser.finishProcessing({ color: hexColor }, svgContainerElement);
  }
}
