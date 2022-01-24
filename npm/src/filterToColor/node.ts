// eslint-disable-next-line import/no-extraneous-dependencies
import * as puppeteerType from 'puppeteer';

export class FilterToColorNode {
  private static TARGET_URL = 'https://www.google.com';

  private static async evaluate(): Promise<string> {
    const canvasSideLength = 20;
    const fillStyle = 'blue';

    function createCanvas(): HTMLCanvasElement {
      const canvas = document.createElement('canvas');
      canvas.width = canvasSideLength;
      canvas.height = canvasSideLength;
      document.body.appendChild(canvas);
      return canvas;
    }

    function fillCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
      context.fillStyle = fillStyle;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function getCanvasImageData(context: CanvasRenderingContext2D): Uint8ClampedArray {
      const canvasMiddleCoordinate = canvasSideLength / 2;
      const canvasSecondaryCoordinate = canvasMiddleCoordinate + 2;
      return context.getImageData(
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

    const canvas = createCanvas();
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    fillCanvas(canvas, context);
    const data = getCanvasImageData(context);
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

  public static async generate(): Promise<string | null> {
    const puppeteer = await FilterToColorNode.getPuppeteerDependency();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(FilterToColorNode.TARGET_URL);
    const result = await page.evaluate(FilterToColorNode.evaluate);
    await browser.close();
    return result;
  }
}
