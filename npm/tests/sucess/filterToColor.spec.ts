/* eslint-disable max-len */
import { FilterToColorResult } from '../../src/shared/types/result';
import { HSL, RGB } from 'color-convert/conversions';
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

type ResultColorTypes = RGB | HSL | string;

describe.only('Filter to color SUCCESS tests - ', () => {
  function testResult(result: FilterToColorResult<ResultColorTypes>, expectedResult: ResultColorTypes) {
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
    ],
    [
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)    ',
      '#6AA1E0',
    ],
    [
      'brightness(  0) saturate(100% ) invert(60%  ) sepia(67%  ) saturate(308%)    HUE-ROTATE(172deg) brightness(88%) contrast(100%)    ',
      '#6AA1E0',
    ],
    [
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      '#2D6963',
    ],
    [
      '  brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      '#2D6963',
    ],
  ].forEach((testParams) => testHexadecimal(testParams[0], testParams[1]));

  [
    [
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)',
      [106, 161, 224],
    ],
    [
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)     ',
      [106, 161, 224],
    ],
    [
      'brightness(0    ) saturate(100%) INVERT(60%) sepia( 67%) saturate( 308% ) hue-rotate(172deg) brightness(  88%) contrast(  100%)     ',
      [106, 161, 224],
    ],
    [
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      [45, 105, 99],
    ],
    [
      '  brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      [45, 105, 99],
    ],
  ].forEach((testParams) => testRgb(testParams[0] as string, testParams[1] as RGB));

  [
    [
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)',
      [212, 66, 65],
    ],
    [
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)     ',
      [212, 66, 65],
    ],
    [
      'brightness(0) saturate(100%) invert(60%) Sepia(67%) SATURATE(308%) hue-rotate(172deg) brightness(88%) CONTRAST(100%)     ',
      [212, 66, 65],
    ],
    [
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      [174, 40, 29],
    ],
    [
      '  brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)',
      [174, 40, 29],
    ],
  ].forEach((testParams) => testHsl(testParams[0] as string, testParams[1] as HSL));
});
