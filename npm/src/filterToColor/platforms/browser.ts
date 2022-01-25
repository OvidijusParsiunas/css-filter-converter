import { FilterToColorShared } from './shared';
import DomToImage from 'dom-to-image';

export class FilterToColorBrowser {
  private static async getImageByte64ViaSVG(svgContainerElement: HTMLElement): Promise<string> {
    const domToImage = (await import('dom-to-image')) as unknown as DomToImage;
    return domToImage.toPng(svgContainerElement);
  }

  public static async generate(filter: string): Promise<string> {
    const svgContainerElement = FilterToColorShared.addSVGElementsToDOM(filter);
    const byte64EncodedData = await FilterToColorBrowser.getImageByte64ViaSVG(svgContainerElement);
    const hexColor = await FilterToColorShared.getColorViaImageByte64(byte64EncodedData);
    FilterToColorShared.cleanup(svgContainerElement);
    return hexColor;
  }
}
