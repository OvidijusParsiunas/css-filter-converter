export class FilterToColorShared {
  public static cleanup(svgContainerElement: HTMLElement): void {
    svgContainerElement.remove();
  }

  public static addSVGElementsToDOM(filter: string): HTMLElement {
    function createSVGContainerElement(): HTMLElement {
      const svgContainerElement = document.createElement('div');
      svgContainerElement.style.height = '1px';
      svgContainerElement.style.width = '1px';
      svgContainerElement.style.position = 'absolute';
      svgContainerElement.style.top = '0px';
      svgContainerElement.style.left = '0px';
      return svgContainerElement;
    }

    function createSVGElement(): SVGSVGElement {
      const iconFilterPrefix = 'brightness(0) saturate(100%)';
      const svgFill = `${iconFilterPrefix} ${filter}`;
      const xmlns = 'http://www.w3.org/2000/svg';
      const svgElement = document.createElementNS(xmlns, 'svg');
      svgElement.style.height = 'inherit';
      svgElement.style.width = 'inherit';
      svgElement.style.float = 'left';
      svgElement.style.filter = svgFill;
      const rect = document.createElementNS(xmlns, 'rect');
      rect.setAttributeNS(null, 'width', '1');
      rect.setAttributeNS(null, 'height', '1');
      svgElement.appendChild(rect);
      return svgElement;
    }

    const svgContainerElement = createSVGContainerElement();
    const svgElement = createSVGElement();
    svgContainerElement.appendChild(svgElement);
    document.body.appendChild(svgContainerElement);
    return svgContainerElement;
  }

  public static async getColorViaImageByte64(byte64EncodedData: string): Promise<string> {
    async function createImage(): Promise<HTMLImageElement> {
      const imageElement = new Image();
      imageElement.src = byte64EncodedData;
      return imageElement;
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

    function getCanvasDetails(canvasElement: HTMLCanvasElement): string {
      const data = getData(canvasElement);
      return `#${`000000${rgbToHex(data[0], data[1], data[2])}`.slice(-6)}`;
    }

    const imageElement = await createImage();
    const canvasElement = createCanvasElement(imageElement);
    return getCanvasDetails(canvasElement);
  }
}
