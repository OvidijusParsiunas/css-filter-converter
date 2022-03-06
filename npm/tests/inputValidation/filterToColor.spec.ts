/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { ColorResultTypes, FilterToColorResult } from '../../src/shared/types/result';
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

// cannot test exact filter results as they change after every run
// therefore this test suite can only validate the result format
describe('Filter to color INPUT VALIDATION tests - ', () => {
  function testError(result: FilterToColorResult<ColorResultTypes>, filter: string): void {
    expect(result.color).to.be.null;
    expect(result.error?.message).to.equal(
      'Input filter color string could not be parsed. Expected format: blur(), brightness(), contrast(), drop-shadow(), grayscale(), ' +
        'hue-rotate(), invert(), saturate(), sepia() with each parameter populated with %, px or deg where approriate e.g. contrast(101%). ' +
        `String received: ${filter}.`,
    );
  }

  function testHexadecimal(filter: string, testNumber: number): void {
    it(`convert filter to hexadecimal: ${testNumber}`, async () => {
      const result = await CssFilterConverter.filterToHex(filter);
      testError(result, filter);
    });
  }

  function testRgb(filter: string, testNumber: number): void {
    it(`convert filter to rgb: ${testNumber}`, async () => {
      const result = await CssFilterConverter.filterToHsl(filter);
      testError(result, filter);
    });
  }

  function testHsl(filter: string, testNumber: number): void {
    it(`convert filter to hsl: ${testNumber}`, async () => {
      const result = await CssFilterConverter.filterToRgb(filter);
      testError(result, filter);
    });
  }

  [
    'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(9aa9%)',
    'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(%99%)',
    'brightness(0) saturate(100%) invert(35%) sepia(48%) ! saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
    'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrastaa(99%)',
    // WORK - should not work here
    // 'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(322222222222288%) hue-rotate(125deg) brightness(93%) contrast(99%)',
    // WORK - should not work here
    // 'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125888deg) brightness(93%) contrast(99%)',
    'brightness(0) saturaaate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
    'brightness saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
    'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93 contrast(99%)',
    // 'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg)brightness(93%) contrast(99%)',
    'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(9 9%)',
    'brightness0 saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
  ].forEach((filter, testNumber) => {
    testHexadecimal(filter, testNumber);
    testRgb(filter, testNumber);
    testHsl(filter, testNumber);
  });
});
