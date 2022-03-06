/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ColorToFilterResult } from '../../src/shared/types/result';
import { KEYWORD } from 'color-convert/conversions';
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

// cannot test exact filter results as they change after every run
// therefore this test suite can only validate the result format
describe('Color to filter INPUT VALIDATION tests - ', () => {
  function testError(result: ColorToFilterResult, expectedErrorMessage: string): void {
    expect(result.color).to.be.null;
    expect(result.error?.message).to.equal(expectedErrorMessage);
  }

  function testHexadecimal(hexString: string): void {
    it(`convert hexadecimal to filter: ${hexString}`, () => {
      const result = CssFilterConverter.hexToFilter(hexString);
      testError(
        result,
        `Input hex color string could not be parsed. Expected format: #ffffff or #fff. String received: ${hexString}.`,
      );
    });
  }

  function testRgb(rgbString: string): void {
    it(`convert rgb to filter: ${rgbString}`, () => {
      const result = CssFilterConverter.rgbToFilter(rgbString);
      testError(
        result,
        'Input rgb color string could not be parsed. Expected format: rgb([0-255], [0-255], [0-255]) or rgb([0-255]' +
          ', [0-255], [0-255], [0-1]) or rgb([0-100%], [0-100%], [0-100%]) or rgb([0-100%], [0-100%], [0-100%], ' +
          `[0-100%]) or [0-255], [0-255], [0-255] or [0-255] [0-255] [0-255]. String received: ${rgbString}.`,
      );
    });
  }

  function testHsl(hslString: string): void {
    it(`convert hsl to filter: ${hslString}`, () => {
      const result = CssFilterConverter.hslToFilter(hslString);
      testError(
        result,
        'Input hsl color string could not be parsed. Expected format: hsl([0-360], [0-100], [0-100]) or ' +
          'hsl([0-360], [0-100%], [0-100%]) or [0-360], [0-100], [0-100] or [0-360] [0-100] [0-100]. ' +
          `String received: ${hslString}.`,
      );
    });
  }

  function testKeyword(keywordString: KEYWORD): void {
    it(`convert keyword to filter: ${keywordString}`, () => {
      const result = CssFilterConverter.keywordToFilter(keywordString);
      testError(
        result,
        'Input keyword color string could not be parsed. Expected format: Generic color string. See the following ' +
          'link for all available colors: https://github.com/colorjs/color-name/blob/master/index.js. ' +
          `String received: ${keywordString}.`,
      );
    });
  }

  [
    '#6aa1e',
    '6aa1e0',
    '#6aa1',
    '#6ia1e0',
    '#6aa1e02',
    '#6aa1.02',
    '#6aa!1e',
    '|6aa1ea',
    '#6aa1z0',
    '#-1a1e0',
    '##aa1e0',
  ].forEach((hexString) => testHexadecimal(hexString));

  [
    'rgb(256, 142, 106)',
    'rgb(224, 256, 106)',
    'rgb(224, 142, 256)',
    'rgb(224, 142, 1000)',
    'rgb(224)',
    'rgb(224,)',
    'rgb(142, 106)',
    'rgb(142, 106,)',
    'rgb(224, 142, a)',
    'rgb(-224, 142, 3)',
    'rgb(224, -142, 3)',
    'rgb(224, 142, -3)',
    'rgb(-224, -142, -3)',
    'rgb(255, 142, 106, 200, 200)', // string length should exceed MAX_COLOR_INPUT_STRING_LENGTH
  ].forEach((rgbString) => testRgb(rgbString));

  [
    'hsl(1723deg, 53%, 48%)',
    'hsl(361deg, 53%, 48%)',
    'hsl(172deg, 101%, 48%)',
    'hsl(172deg, 53%, 101%)',
    'hsl(172deg)',
    'hsl(172deg,)',
    'hsl(172deg, 53%)',
    'hsl(172deg, 53%,)',
    'hsl(172deg, 53%, a%)',
    'hsl(-172deg, 53%, 4%)',
    'hsl(172deg, -53%, 4%)',
    'hsl(172deg, 53%, -4%)',
    'hsl(-172deg, -53%, -4%)',
    'hsl(172deg, 53%, 48%, 100, 100)', // string length should exceed MAX_COLOR_INPUT_STRING_LENGTH
  ].forEach((hslString) => testHsl(hslString));

  [
    'reda',
    'blueyellow',
    'red!',
    '123123',
    'yeelow',
    'blue.',
    'redred',
    '1yellow',
    'yellowy',
    'blueish',
    'purple1',
    'strongdark',
    'light-green',
    'light grey',
  ].forEach((keywordString) => testKeyword(keywordString as KEYWORD));
});
