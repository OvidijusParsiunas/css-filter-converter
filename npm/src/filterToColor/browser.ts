import DomToImage from 'dom-to-image';

export class FilterToColorBrowser {
  private static rgbToHex(r: number, g: number, b: number): string {
    if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  private static getData(canvasElement: HTMLCanvasElement): Uint8ClampedArray {
    const canvasMiddleCoordinate = canvasElement.width / 2;
    const canvasSecondaryCoordinate = canvasMiddleCoordinate + 2;
    return (canvasElement.getContext('2d') as CanvasRenderingContext2D).getImageData(
      canvasMiddleCoordinate,
      canvasMiddleCoordinate,
      canvasSecondaryCoordinate,
      canvasSecondaryCoordinate,
    ).data;
  }

  private static async getCanvasDetails(canvas: HTMLCanvasElement): Promise<string> {
    const data = FilterToColorBrowser.getData(canvas);
    return `#${`000000${FilterToColorBrowser.rgbToHex(data[0], data[1], data[2])}`.slice(-6)}`;
  }

  private static createCanvasElement(imageElement: HTMLImageElement): HTMLCanvasElement {
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

  private static cleanup(svgContainerElement: HTMLElement): void {
    svgContainerElement.remove();
  }

  private static async createImageElement(svgContainerElement: HTMLElement): Promise<HTMLImageElement> {
    const domToImage = (await import('dom-to-image')) as unknown as DomToImage;
    const dataUrl = await domToImage.toPng(svgContainerElement);
    const imageElement = new Image();
    imageElement.src = dataUrl;
    return imageElement;
  }

  private static createSVGElement(filter: string): SVGSVGElement {
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

  private static createSVGContainer(): HTMLElement {
    const svgContainerElement = document.createElement('div');
    svgContainerElement.style.height = '1px';
    svgContainerElement.style.width = '1px';
    svgContainerElement.style.position = 'absolute';
    svgContainerElement.style.top = '0px';
    svgContainerElement.style.left = '0px';
    return svgContainerElement;
  }

  private static addSVGElementsToDOM(filter: string): HTMLElement {
    const svgContainerElement = FilterToColorBrowser.createSVGContainer();
    const svgElement = FilterToColorBrowser.createSVGElement(filter);
    svgContainerElement.appendChild(svgElement);
    document.body.appendChild(svgContainerElement);
    return svgContainerElement;
  }

  public static async generate(filter: string): Promise<string> {
    const svgContainerElement = FilterToColorBrowser.addSVGElementsToDOM(filter);
    const imageElement = await FilterToColorBrowser.createImageElement(svgContainerElement);
    const canvasElement = FilterToColorBrowser.createCanvasElement(imageElement);
    FilterToColorBrowser.cleanup(svgContainerElement);
    return FilterToColorBrowser.getCanvasDetails(canvasElement);
  }
}
