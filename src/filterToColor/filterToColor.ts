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

    function fillCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function getCanvasImageData(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Uint8ClampedArray {
      return ctx.getImageData(canvas.width / 2, canvas.width / 2, canvas.width / 2 + 2, canvas.width / 2 + 2).data;
    }

    function rgbToHex(r: number, g: number, b: number): string {
      // Error handling
      if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
      return ((r << 16) | (g << 8) | b).toString(16);
    }

    const canvas = createCanvas();
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    fillCanvas(canvas, ctx);
    const data = getCanvasImageData(canvas, ctx);
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
