/* eslint-disable max-len */
import { ColorResultTypes, FilterToColorResult } from '../../src/shared/types/result';
import { HSL, RGB } from 'color-convert/conversions';
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

describe('Filter to color SUCCESS tests - ', () => {
  function testResult(result: FilterToColorResult<ColorResultTypes>, expectedResult: ColorResultTypes) {
    expect(result.color?.toString()).to.equal(expectedResult.toString());
  }

  function testHexadecimal(filter: string, expectedResult: string): void {
    it(`convert filter to hexadecimal: ${expectedResult}`, async () => {
      const result = await CssFilterConverter.filterToHex(filter);
      testResult(result, expectedResult);
    });
  }

  function testRgb(filter: string, expectedResult: RGB): void {
    it(`convert filter to rgb: ${expectedResult}`, async () => {
      const result = await CssFilterConverter.filterToRgb(filter);
      testResult(result, expectedResult);
    });
  }

  function testHsl(filter: string, expectedResult: HSL): void {
    it(`convert filter to hsl: ${expectedResult}`, async () => {
      const result = await CssFilterConverter.filterToHsl(filter);
      testResult(result, expectedResult);
    });
  }

  [
    [
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)',
      '#6AA1E0',
      [106, 161, 224],
      [212, 66, 65],
    ],
    [
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)    ',
      '#6AA1E0',
      [106, 161, 224],
      [212, 66, 65],
    ],
    [
      'brightness(  0) saturate(100% ) invert(60%  ) sepia(67%  ) saturate(308%)    HUE-ROTATE(172deg) brightness(88%) contrast(100%)    ',
      '#6AA1E0',
      [106, 161, 224],
      [212, 66, 65],
    ],
    [
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      '#2D6963',
      [45, 105, 99],
      [174, 40, 29],
    ],
    [
      '  brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      '#2D6963',
      [45, 105, 99],
      [174, 40, 29],
    ],
    [
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(322222222222288%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      '#016B01',
      [1, 107, 1],
      [120, 98, 21],
    ],
    [
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125888deg) brightness(93%) contrast(99%)',
      '#7C4F7F',
      [124, 79, 127],
      [296, 23, 40],
    ],
    [
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg)brightness(93%) contrast(99%)',
      '#2D6963',
      [45, 105, 99],
      [174, 40, 29],
    ],
    [
      'brightness(0)saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg)brightness(93%) contrast(99%)',
      '#2D6963',
      [45, 105, 99],
      [174, 40, 29],
    ],
    [
      'brightness(0)saturate(100%)invert(35%)sepia(48%)saturate(388%)hue-rotate(125deg)brightness(93%)contrast(99%)',
      '#2D6963',
      [45, 105, 99],
      [174, 40, 29],
    ],
  ].forEach((testParams) => {
    testHexadecimal(testParams[0] as string, testParams[1] as string);
    testRgb(testParams[0] as string, testParams[2] as RGB);
    testHsl(testParams[0] as string, testParams[3] as HSL);
  });
});
