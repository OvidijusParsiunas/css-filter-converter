// eslint-disable-next-line import/no-extraneous-dependencies
import * as puppeteerType from 'puppeteer';

export class FilterToColorNode {
  private static TARGET_URL = 'http://localhost:3000';

  private static async createSVG(filter: string): Promise<void> {
    function createSVG(): SVGSVGElement {
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

    function createSVGContainer(): HTMLElement {
      const svgContainer = document.createElement('div');
      svgContainer.id = 'css-filter-converter-svg-container';
      svgContainer.style.height = '10px';
      svgContainer.style.width = '10px';
      svgContainer.style.position = 'absolute';
      const iconFilterPrefix = 'brightness(0) saturate(100%)';
      const svgFill = `${iconFilterPrefix} ${filter}`;
      svgContainer.style.top = '0px';
      svgContainer.style.filter = svgFill;
      return svgContainer;
    }

    const svgContainer = createSVGContainer();
    const svg = createSVG();
    svgContainer.appendChild(svg);
    document.body.appendChild(svgContainer);
  }

  private static async evaluate(screenshot: string): Promise<string> {
    function createCanvas(imageElement: HTMLImageElement): HTMLCanvasElement {
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

    function getCanvasImageData(canvasElement: HTMLCanvasElement): Uint8ClampedArray {
      const canvasMiddleCoordinate = canvasElement.width / 2;
      const canvasSecondaryCoordinate = canvasMiddleCoordinate + 2;
      return (canvasElement.getContext('2d') as CanvasRenderingContext2D).getImageData(
        canvasMiddleCoordinate,
        canvasMiddleCoordinate,
        canvasSecondaryCoordinate,
        canvasSecondaryCoordinate,
      ).data;
    }

    function rgbToHex(r: number, g: number, b: number): string {
      // Error handling
      if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
      return ((r << 16) | (g << 8) | b).toString(16);
    }

    async function createImage() {
      const imageElement = new Image();
      imageElement.src = `data:image/png;base64,${screenshot}`;
      return imageElement;
    }

    const imageElement = await createImage();
    const canvasElement = createCanvas(imageElement);
    const data = getCanvasImageData(canvasElement);
    const hex = rgbToHex(data[0], data[1], data[2]);
    return `#${`000000${hex}`.slice(-6)}`;
  }

  private static async getPuppeteerDependency(): Promise<{ launch: () => puppeteerType.Browser }> {
    try {
      // this is used to prevent webpack from evaluating the puppeteer module by adding dynamicity to the require path
      const pathPadding = '';
      // eslint-disable-next-line prefer-template
      return require('puppeteer' + pathPadding);
    } catch (e: unknown) {
      throw new Error(
        "ERROR: To generate color values from filter in Node - you will first need to install 'puppeteer' " +
          'by running: \n npm install puppeteer',
      );
    }
  }

  public static async generate(filter: string): Promise<string | null> {
    const puppeteer = await FilterToColorNode.getPuppeteerDependency();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const viewport = { width: 1, height: 1 };
    // selector does not work with versions + 6.0.0 and don't want to ask the user to install this particular version,
    //cespecially if they already have puppeteer installed
    await page.setViewport(viewport);
    await page.goto(FilterToColorNode.TARGET_URL);
    await page.evaluate(FilterToColorNode.createSVG, filter);
    const screenshot = await page.screenshot({ encoding: 'base64' });
    const result = await page.evaluate(FilterToColorNode.evaluate, screenshot as string);
    browser.close();
    return result;
  }
}
