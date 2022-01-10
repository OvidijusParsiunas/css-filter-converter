import { Result } from '../types/result';
import { SPSA } from '../types/SPSA';
import { HSL } from '../types/HSL';
import { Color } from './color';

export class FilterCssGenerator {
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
    return `brightness(0) saturate(100%) invert(${FilterCssGenerator.fmt(
      filters,
      0,
    )}%) sepia(${FilterCssGenerator.fmt(filters, 1)}%) saturate(${FilterCssGenerator.fmt(
      filters,
      2,
    )}%) hue-rotate(${FilterCssGenerator.fmt(
      filters,
      3,
      3.6,
    )}deg) brightness(${FilterCssGenerator.fmt(filters, 4)}%) contrast(${FilterCssGenerator.fmt(
      filters,
      5,
    )}%)`;
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
        value = max + (value % max);
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
        const g = (lossDiff / (2 * ck)) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = FilterCssGenerator.fixSpsa(values[i] - ak * g, i);
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
