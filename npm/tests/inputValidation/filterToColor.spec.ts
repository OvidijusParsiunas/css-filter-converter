/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

// cannot test exact filter results as they change after every run
// therefore this test suite can only validate the result format
describe('Filter to color INPUT VALIDATION tests - ', () => {
  it('convert filter to hexadecimal', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(9aa9%)';

    // when
    const result = await CssFilterConverter.filterToHex(filter);

    // then
    expect(result.color).to.be.null;
    expect(result.error?.message).to.equal(
      'Input filter color string could not be parsed. Expected format: blur(), brightness(), contrast(), drop-shadow(), grayscale(), ' +
        'hue-rotate(), invert(), saturate(), sepia() with each parameter populated with %, px or deg where approriate e.g. contrast(101%). ' +
        `String received: ${filter}.`,
    );
  });

  it('convert filter to rgb', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(9aa9%)';

    // when
    const result = await CssFilterConverter.filterToRgb(filter);

    // then
    expect(result.color).to.be.null;
    expect(result.error?.message).to.equal(
      'Input filter color string could not be parsed. Expected format: blur(), brightness(), contrast(), drop-shadow(), grayscale(), ' +
        'hue-rotate(), invert(), saturate(), sepia() with each parameter populated with %, px or deg where approriate e.g. contrast(101%). ' +
        `String received: ${filter}.`,
    );
  });

  it('convert filter to hsl', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(9aa9%)';

    // when
    const result = await CssFilterConverter.filterToHsl(filter);

    // then
    expect(result.color).to.be.null;
    expect(result.error?.message).to.equal(
      'Input filter color string could not be parsed. Expected format: blur(), brightness(), contrast(), drop-shadow(), grayscale(), ' +
        'hue-rotate(), invert(), saturate(), sepia() with each parameter populated with %, px or deg where approriate e.g. contrast(101%). ' +
        `String received: ${filter}.`,
    );
  });
});
