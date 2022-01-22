import * as puppeteer from 'puppeteer';

export class FilterToColor {
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

  public static async generate(): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(FilterToColor.TARGET_URL);
    const result = await page.evaluate(FilterToColor.evaluate);
    await browser.close();
    return result;
  }
}
