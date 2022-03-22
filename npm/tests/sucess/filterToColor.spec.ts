/* eslint-disable max-len */
import { ColorFormatter } from '../../src/shared/functionality/colorFormatter/colorFormatter';
import { ColorResultTypes, FilterToColorResult } from '../../src/shared/types/result';
import { FilterToColorOptions } from '../../src/shared/types/options';
import { HSL, RGB } from 'color-convert/conversions';
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

describe('Filter to color SUCCESS tests - ', () => {
  function testResult(result: FilterToColorResult<ColorResultTypes>, expectedResult: ColorResultTypes) {
    expect(result.color?.toString()).to.equal(expectedResult.toString());
  }

  function buildTestName(type: string, color: ColorResultTypes, options?: FilterToColorOptions) {
    const resultTypeDescription =
      options?.resultType !== undefined ? `resultType: ${options.resultType}` : 'no resultType option';
    return `convert filter to ${type} (${resultTypeDescription}): ${color}`;
  }

  function testHexadecimal(filter: string, expectedResult: string): void {
    it(buildTestName('hexadecimal', expectedResult), async () => {
      const result = await CssFilterConverter.filterToHex(filter);
      testResult(result, expectedResult);
    });
  }

  function testRgb(filter: string, expectedResult: RGB, options?: FilterToColorOptions): void {
    const expectedProcessedResult =
      options?.resultType === 'string' ? ColorFormatter.arrayToRgbString(expectedResult) : expectedResult;
    it(buildTestName('rgb', expectedProcessedResult, options), async () => {
      const result = await CssFilterConverter.filterToRgb(filter, options);
      testResult(result, expectedProcessedResult);
    });
  }

  function testHsl(filter: string, expectedResult: HSL, options?: FilterToColorOptions): void {
    const expectedProcessedResult =
      options?.resultType === 'string' ? ColorFormatter.arrayToHslString(expectedResult) : expectedResult;
    it(buildTestName('hsl', expectedProcessedResult, options), async () => {
      const result = await CssFilterConverter.filterToHsl(filter, options);
      testResult(result, expectedProcessedResult);
    });
  }

  function runTests(options?: FilterToColorOptions) {
    [
      [
        'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)',
        '#6AA1E0',
        [106, 161, 224],
        [212, 66, 80],
      ],
      [
        'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)    ',
        '#6AA1E0',
        [106, 161, 224],
        [212, 66, 80],
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
      [
        'brightness(0) sepia(67%) brightness(88%) invert(60%) saturate(308%) hue-rotate(172deg) saturate(100%) contrast(100%)',
        '#999999',
        [153, 153, 153],
        [0, 0, 60],
      ],
      ['brightness(0) saturate(100%) invert(60%) sepia(67%)', '#BDAE93', [189, 174, 147], [39, 24, 66]],
      ['sepia(67%) saturate(100%) brightness(0) invert(60%)', '#999999', [153, 153, 153], [0, 0, 60]],
    ].forEach((testParams) => {
      testHexadecimal(testParams[0] as string, testParams[1] as string);
      testRgb(testParams[0] as string, testParams[2] as RGB, options);
      testHsl(testParams[0] as string, testParams[3] as HSL, options);
    });
  }

  runTests();
  runTests({ resultType: 'string' });
  runTests({ resultType: 'array' });
});
