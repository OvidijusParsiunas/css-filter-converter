import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { ColorFormats } from '../../shared/consts/colorFormats';
import { ColorTypes } from '../../shared/consts/colorTypes';
import { Error } from '../../shared/types/error';

export interface SVGAddResult extends Partial<Error> {
  svgContainerElement: HTMLElement;
}

export class FilterToHexShared {
  protected static generateInputErrorMessage(filterString: string): string {
    return ErrorHandling.generateInputErrorMessage(ColorTypes.FILTER, filterString, ColorFormats.FILTER);
  }

  // functions are encapsulated within a single method in order to allow them to be executed within the same context
  // of the puppeteer evaluate method
  protected static addSVGElementsToDOMAndValidateFilter(filterString: string, svgSideLength = 1): SVGAddResult {
    function createSVGElement(): SVGSVGElement {
      const iconFilterPrefix = 'brightness(0) saturate(100%)';
      const svgFill = `${iconFilterPrefix} ${filterString}`;
      const xmlns = 'http://www.w3.org/2000/svg';
      const svgElement = document.createElementNS(xmlns, 'svg');
      svgElement.style.height = 'inherit';
      svgElement.style.width = 'inherit';
      svgElement.style.float = 'left';
      svgElement.style.filter = svgFill;
      const rect = document.createElementNS(xmlns, 'rect');
      rect.setAttributeNS(null, 'width', svgSideLength.toString());
      rect.setAttributeNS(null, 'height', svgSideLength.toString());
      svgElement.appendChild(rect);
      return svgElement;
    }

    function createSVGContainerElement(): HTMLElement {
      const svgContainerElement = document.createElement('div');
      svgContainerElement.style.height = `${svgSideLength}px`;
      svgContainerElement.style.width = `${svgSideLength}px`;
      svgContainerElement.style.position = 'absolute';
      svgContainerElement.style.top = '0px';
      svgContainerElement.style.left = '0px';
      return svgContainerElement;
    }

    const svgContainerElement = createSVGContainerElement();
    const svgElement = createSVGElement();
    if (svgElement.style.filter === '') return { errorMessage: 'error indicator', svgContainerElement };
    svgContainerElement.appendChild(svgElement);
    document.body.appendChild(svgContainerElement);
    return { svgContainerElement };
  }

  // functions are encapsulated within a single method in order to allow them to be executed within the same context
  // of the puppeteer evaluate method
  protected static async getColorViaImageDataURL(byte64EncodedDataURL: string): Promise<string> {
    function rgbToHex(r: number, g: number, b: number): string {
      if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
      return ((r << 16) | (g << 8) | b).toString(16);
    }

    function getData(canvasElement: HTMLCanvasElement): Uint8ClampedArray {
      const canvasStartCoordinate = 0;
      const canvasFinalCoordinate = canvasElement.width;
      return (canvasElement.getContext('2d') as CanvasRenderingContext2D).getImageData(
        canvasStartCoordinate,
        canvasStartCoordinate,
        canvasFinalCoordinate,
        canvasFinalCoordinate,
      ).data;
    }

    function getCanvasHexColor(canvasElement: HTMLCanvasElement): string {
      const data = getData(canvasElement);
      const hex = rgbToHex(data[0], data[1], data[2]);
      return `#${`000000${hex}`.slice(-6)}`;
    }

    function createCanvasElement(imageElement: HTMLImageElement): HTMLCanvasElement {
      const canvasElement = document.createElement('canvas');
      canvasElement.width = imageElement.width;
      canvasElement.height = imageElement.height;
      (canvasElement.getContext('2d') as CanvasRenderingContext2D).drawImage(
        imageElement,
        0,
        0,
        imageElement.width,
        imageElement.height,
      );
      return canvasElement;
    }

    async function createImage(): Promise<HTMLImageElement> {
      const imageElement = new Image();
      imageElement.src = byte64EncodedDataURL;
      return imageElement;
    }

    const imageElement = await createImage();
    const canvasElement = createCanvasElement(imageElement);
    return getCanvasHexColor(canvasElement);
  }
}
