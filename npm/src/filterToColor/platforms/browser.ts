import { FilterToColorShared } from './shared';
import DomToImage from 'dom-to-image';

export class FilterToColorBrowser {
  public static cleanup(svgContainerElement: HTMLElement): void {
    svgContainerElement.remove();
  }

  private static async getImageByte64ViaSVG(svgContainerElement: HTMLElement): Promise<string> {
    const domToImage = (await import('dom-to-image')) as unknown as DomToImage;
    return domToImage.toPng(svgContainerElement);
  }

  public static async generate(filter: string): Promise<string> {
    const svgContainerElement = FilterToColorShared.addSVGElementsToDOM(filter);
    const byte64EncodedDataURL = await FilterToColorBrowser.getImageByte64ViaSVG(svgContainerElement);
    const hexColor = await FilterToColorShared.getColorViaImageDataURL(byte64EncodedDataURL);
    FilterToColorBrowser.cleanup(svgContainerElement);
    return hexColor;
  }
}
