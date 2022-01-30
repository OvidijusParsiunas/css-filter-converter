import { ColorToFilterResult } from '../../shared/types/result';
import { RgbColor } from '../rgbColor/rgbColor';
import { SPSA } from '../../shared/types/SPSA';

export class RgbToFilterWorker {
  private readonly targetRgbColor: RgbColor;

  private readonly reusedRgbColor: RgbColor;

  constructor(targetRgbColor: RgbColor) {
    this.targetRgbColor = targetRgbColor;
    this.reusedRgbColor = new RgbColor();
  }

  private static fmt(filters: number[], idx: number, multiplier = 1): number {
    return Math.round(filters[idx] * multiplier);
  }

  private generateCss(filters: number[]): string {
    // prettier-ignore
    // eslint-disable-next-line max-len
    return `brightness(0) saturate(100%) invert(${RgbToFilterWorker.fmt(filters, 0)}%) sepia(${RgbToFilterWorker.fmt(filters, 1)}%) saturate(${RgbToFilterWorker.fmt(filters, 2)}%) hue-rotate(${RgbToFilterWorker.fmt(filters, 3, 3.6)}deg) brightness(${RgbToFilterWorker.fmt(filters, 4)}%) contrast(${RgbToFilterWorker.fmt(filters, 5)}%)`;
  }

  private loss(filters: number[]): number {
    this.reusedRgbColor.setRgb(0, 0, 0);
    this.reusedRgbColor.invert(filters[0] / 100);
    this.reusedRgbColor.sepia(filters[1] / 100);
    this.reusedRgbColor.saturate(filters[2] / 100);
    this.reusedRgbColor.hueRotate(filters[3] * 3.6);
    this.reusedRgbColor.brightness(filters[4] / 100);
    this.reusedRgbColor.contrast(filters[5] / 100);

    return (
      Math.abs(this.reusedRgbColor.r - this.targetRgbColor.r) +
      Math.abs(this.reusedRgbColor.g - this.targetRgbColor.g) +
      Math.abs(this.reusedRgbColor.b - this.targetRgbColor.b)
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

    for (let k = 0; k < iters; k += 1) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i += 1) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i += 1) {
        const g = (lossDiff / (2 * ck)) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = RgbToFilterWorker.fixSpsa(values[i] - ak * g, i);
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
    for (let i = 0; best.loss > 25 && i < 3; i += 1) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  public convert(): ColorToFilterResult {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      color: this.generateCss(result.values),
    };
  }
}
