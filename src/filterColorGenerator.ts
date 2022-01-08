interface HSL {
  h: number;
  s: number;
  l: number;
}

interface SPSA {
  values: number[];
  loss: number;
}

interface Result {
  values: number[];
  loss: number;
  filter: string;
}

type ColorStringTypes = 'rgb' | 'hex' | 'default';

class RgbParseUtil {
  
  private static regExpMatchArrayToRgbNumArr(rgbArr: string[]): number[] {
    return [
      parseInt(rgbArr[1], 16),
      parseInt(rgbArr[2], 16),
      parseInt(rgbArr[3], 16),
    ];
  }

  private static buildRgbArr(fullHex: string): number[] {
    // extract individual hex: #c11a1a -> ['#c11a1a', 'c1', '1a', '1a', ...]
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (result) return RgbParseUtil.regExpMatchArrayToRgbNumArr(result);
    throw new Error(`Colour ${fullHex} could not be parsed. Expected string starting with a # and followed by 3 or 6 hexadecimal characters. E.g. #03F or #0033FF`);
  }

  private static shorthandHexToFullHex(shorthandHex: string): string {
    // Expand shorthand form: #03F -> #0033FF
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    return shorthandHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  }

  private static hexStringToRgbArr(shorthandHex: string): number[] {
    const fullHex = RgbParseUtil.shorthandHexToFullHex(shorthandHex);
    return RgbParseUtil.buildRgbArr(fullHex);
  }

  private static rgbStringToRgbArr(rgb: string): number[] {
    const result = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (result) return RgbParseUtil.regExpMatchArrayToRgbNumArr(result);
    throw new Error(`Colour ${rgb} could not be parsed. Expected the following string format: 'rgb(number,number,number) E.g. rgb(10,122,255)`);
  }

  public static colorStringToRgbArr(colorString: string, type: ColorStringTypes): number[] {
    if (type === 'hex') return RgbParseUtil.hexStringToRgbArr(colorString);
    if (type === 'rgb') return RgbParseUtil.rgbStringToRgbArr(colorString);
    return [0, 0, 0];
  }
}

class Color {

  public r!: number;

  public g!: number;

  public b!: number;

  constructor(colorString: string, type: ColorStringTypes) {
    const rgbArr = RgbParseUtil.colorStringToRgbArr(colorString, type);
    this.setRgb(rgbArr[0], rgbArr[1], rgbArr[2]);
  }
  
  private clamp(value: number): number {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }

  public setRgb(r: number, g: number, b: number): void {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  private multiply(matrix: number[]): void {
    const newR = this.clamp((this.r) * matrix[0] + (this.g) * matrix[1] + (this.b) * matrix[2]);
    const newG = this.clamp((this.r) * matrix[3] + (this.g) * matrix[4] + (this.b) * matrix[5]);
    const newB = this.clamp((this.r) * matrix[6] + (this.g) * matrix[7] + (this.b) * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  public hueRotate(angle = 0): void {
    angle = angle / 180 * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  public sepia(value = 1): void {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  public saturate(value = 1): void {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  private linear(slope = 1, intercept = 0): void {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g  * slope + intercept * 255);
    this.b = this.clamp(this.b  * slope + intercept * 255);
  }

  public brightness(value = 1): void {
    this.linear(value);
  }

  public contrast(value = 1): void {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  public invert(value = 1): void {
    this.r = this.clamp((value + (this.r) / 255 * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g) / 255 * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b) / 255 * (1 - 2 * value)) * 255);
  }

  public hsl(): HSL {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const average = (max + min) / 2;
    let h = average;
    let s = average;
    const l = average;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  public toRgb(): string {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }

  private static componentToHex(component: number): string {
    const hex = Math.round(component).toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  }

  public toHex(): string {
    return `#${Color.componentToHex(this.r)}${Color.componentToHex(this.g)}${Color.componentToHex(this.b)}`;
  }
}

class CssGenerator {

  private targetColor: Color;

  private targetColorHSL: HSL;

  private reusedColor: Color;

  constructor(targetColor: Color) {
    this.targetColor = targetColor;
    this.targetColorHSL = targetColor.hsl();
    this.reusedColor = new Color('', 'default');
  }

  private static fmt(filters: number[], idx: number, multiplier = 1): number {
    return Math.round(filters[idx] * multiplier);
  }

  private generateCss(filters: number[]): string {
    return `brightness(0) saturate(100%) invert(${CssGenerator.fmt(filters, 0)}%) sepia(${CssGenerator.fmt(filters, 1)}%) saturate(${CssGenerator.fmt(filters, 2)}%) hue-rotate(${CssGenerator.fmt(filters, 3, 3.6)}deg) brightness(${CssGenerator.fmt(filters, 4)}%) contrast(${CssGenerator.fmt(filters, 5)}%)`;
  }

  private loss(filters: number[]): number {
    this.reusedColor.setRgb(0, 0, 0);

    this.reusedColor.invert(filters[0] / 100);
    this.reusedColor.sepia(filters[1] / 100);
    this.reusedColor.saturate(filters[2] / 100);
    this.reusedColor.hueRotate(filters[3] * 3.6);
    this.reusedColor.brightness(filters[4] / 100);
    this.reusedColor.contrast(filters[5] / 100);

    const colorHSL = this.reusedColor.hsl();
    return (
      Math.abs(this.reusedColor.r - this.targetColor.r) +
      Math.abs(this.reusedColor.g - this.targetColor.g) +
      Math.abs(this.reusedColor.b - this.targetColor.b) +
      Math.abs(colorHSL.h - this.targetColorHSL.h) +
      Math.abs(colorHSL.s - this.targetColorHSL.s) +
      Math.abs(colorHSL.l - this.targetColorHSL.l)
    );
  }

  private static fixSpsa(value: number, idx: number): number {
    let max = 100;
    if (idx === 2 /* saturate */) {
      max = 7500;
    } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
      max = 200;
    }

    if (idx === 3 /* hue-rotate */) {
      if (value > max) {
        value %= max;
      } else if (value < 0) {
        value = max + value % max;
      }
    } else if (value < 0) {
      value = 0;
    } else if (value > max) {
      value = max;
    }
    return value;
  }

  private spsa(A: number, a: number[], c: number, values: number[], iters: number): SPSA {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best: number[] = [];
    let bestLoss = Infinity;
    const deltas: number[] = new Array(6);
    const highArgs: number[] = new Array(6);
    const lowArgs: number[] = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = lossDiff / (2 * ck) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = CssGenerator.fixSpsa(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };
  }

  private solveNarrow(wide: SPSA): SPSA {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  private solveWide(): SPSA {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best: SPSA = { values: [], loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  public generate(): Result {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.generateCss(result.values),
    };
  }
}

export class FilterColorGenerator {

  public static generate(hex: string): string {
    const color = new Color(hex, 'hex');
    const cssGenerator = new CssGenerator(color);
    const result = cssGenerator.generate();
    return result.filter;
  }
}
