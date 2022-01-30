import domtoimage from 'dom-to-image';

export class FilterToHexBrowser {
  private static cleanup(svgContainer: HTMLElement): void {
    svgContainer.remove();
  }

  private static rgbToHex(r: number, g: number, b: number): string {
    if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  private static getData(canvas: HTMLCanvasElement): Uint8ClampedArray {
    return (canvas.getContext('2d') as CanvasRenderingContext2D).getImageData(
      canvas.width / 2,
      canvas.width / 2,
      canvas.width / 2 + 2,
      canvas.width / 2 + 2,
    ).data;
  }

  private static async getCanvasDetails(canvas: HTMLCanvasElement): Promise<string> {
    const data = FilterToHexBrowser.getData(canvas);
    return `#${`000000${FilterToHexBrowser.rgbToHex(data[0], data[1], data[2])}`.slice(-6)}`;
  }

  private static createCanvasElement(imageElement: HTMLImageElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    (canvas.getContext('2d') as CanvasRenderingContext2D).drawImage(
      imageElement,
      0,
      0,
      imageElement.width,
      imageElement.height,
    );
    document.body.appendChild(canvas);
    return canvas;
  }

  private static async createImageElement(svgContainer: HTMLElement): Promise<HTMLImageElement> {
    const dataUrl = await domtoimage.toPng(svgContainer);
    const image = new Image();
    image.src = dataUrl;
    return image;
  }

  private static createSVG(filter: string): SVGSVGElement {
    const iconFilterPrefix = 'brightness(0) saturate(100%)';
    const svgFill = `${iconFilterPrefix} ${filter}`;
    const xmlns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(xmlns, 'svg');
    svg.style.height = 'inherit';
    svg.style.width = 'inherit';
    svg.style.float = 'left';
    svg.style.filter = svgFill;
    const rect = document.createElementNS(xmlns, 'rect');
    rect.setAttributeNS(null, 'width', '1');
    rect.setAttributeNS(null, 'height', '1');
    svg.appendChild(rect);
    return svg;
  }

  private static createSVGContainer(): HTMLElement {
    const svgContainer = document.createElement('div');
    svgContainer.style.height = '1px';
    svgContainer.style.width = '1px';
    svgContainer.style.position = 'absolute';
    svgContainer.style.top = '0px';
    return svgContainer;
  }

  private static addSVGElementsToDOM(filter: string): HTMLElement {
    const svgContainer = FilterToHexBrowser.createSVGContainer();
    const svg = FilterToHexBrowser.createSVG(filter);
    svgContainer.appendChild(svg);
    document.body.appendChild(svgContainer);
    return svgContainer;
  }

  public static async generate(filter: string): Promise<string> {
    const svgContainer = FilterToHexBrowser.addSVGElementsToDOM(filter);
    const imageElement = await FilterToHexBrowser.createImageElement(svgContainer);
    const canvas = FilterToHexBrowser.createCanvasElement(imageElement);
    FilterToHexBrowser.cleanup(svgContainer);
    return FilterToHexBrowser.getCanvasDetails(canvas);
  }
}

function FilterToColor() {
  async function generate() {
    const textInputElement = document.getElementById('textInput') as HTMLInputElement;
    const input = textInputElement.value;
    const result = await FilterToHexBrowser.generate(input);
    console.log(result);
  }

  return (
    <button type="button" onClick={generate}>
      Click me!
    </button>
  );
}

export default FilterToColor;
