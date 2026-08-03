/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation, dot-notation */
import { RgbToFilterWorker } from '../../src/colorToFilter/rgbToFilter/rgbToFilterWorker';
import { RgbColor } from '../../src/colorToFilter/rgbToFilter/rgbColor';
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

// regression tests for cross-browser filter instability - a filter generated for #B7D64F rendered as
// RGB(182, 212, 80) in Chrome but RGB(222, 196, 96) in Firefox because extreme saturation amplified
// per-stage 8-bit channel rounding differences until a channel clipped:
// brightness(0) saturate(100%) invert(72%) sepia(4%) saturate(4750%)
//   hue-rotate(33deg) brightness(105%) contrast(103%)
describe('Filter stability REGRESSION tests - ', () => {
  // #B7D64F
  const targetRgbColor = new RgbColor([183, 214, 79]);

  // the known unstable candidate in the optimizer's internal representation (hue-rotate is stored as 0-100)
  const unstableFilters = [72, 4, 4750, 33 / 3.6, 105, 103];

  function applyUnstableFilters(color: RgbColor): RgbColor {
    color.invert(0.72);
    color.sepia(0.04);
    color.saturate(47.5);
    color.hueRotate(33);
    color.brightness(1.05);
    color.contrast(1.03);
    return color;
  }

  it('fractional channel pipeline reproduces the Chrome-observed color', () => {
    const color = applyUnstableFilters(new RgbColor([0, 0, 0]));
    expect(color.r).to.be.closeTo(182, 1);
    expect(color.g).to.be.closeTo(212, 1);
    expect(color.b).to.be.closeTo(80, 1);
  });

  it('per-stage 8-bit rounded pipeline reproduces the Firefox-observed color', () => {
    const color = applyUnstableFilters(new RgbColor([0, 0, 0], true));
    expect([color.r, color.g, color.b]).to.deep.equal([222, 196, 96]);
  });

  it('unstable candidate is accepted by the fractional loss but rejected by the serialized cross-precision loss', () => {
    const worker = new RgbToFilterWorker(targetRgbColor, true);
    // low fractional loss is what allowed this candidate to be emitted before the fix
    expect(worker['loss'](unstableFilters)).to.be.lessThan(10);
    // the serialized score takes the worst of the two precision models, exposing the instability
    expect(worker['serializedLoss'](unstableFilters)).to.be.greaterThan(50);
  });

  it('converting #B7D64F produces a filter whose worst-case cross-precision loss is low', () => {
    const result = CssFilterConverter.hexToFilter('#B7D64F');
    expect(result.error).to.be.undefined;
    expect(result.loss).to.be.a('number');
    expect(result.loss as number).to.be.lessThan(30);
  });
});
