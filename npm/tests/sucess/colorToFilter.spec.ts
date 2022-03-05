/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ColorToFilterResult } from '../../src/shared/types/result';
import { Options } from '../../src/shared/types/options';
import { KEYWORD } from 'color-convert/conversions';
import CssFilterConverter from '../../src/index';
import { expect } from 'chai';
import 'mocha';

// cannot test exact filter results as they change after every run
// therefore this test suite can only validate the result format
describe('Color to filter SUCCESS tests - ', () => {
  function testFilterWithSheen(filterFunctionArray: string[]): void {
    expect(filterFunctionArray).to.have.lengthOf(8);
    expect(filterFunctionArray[0].startsWith('brightness')).to.be.true;
    expect(filterFunctionArray[1].startsWith('saturate')).to.be.true;
    expect(filterFunctionArray[2].startsWith('invert')).to.be.true;
    expect(filterFunctionArray[3].startsWith('sepia')).to.be.true;
    expect(filterFunctionArray[4].startsWith('saturate')).to.be.true;
    expect(filterFunctionArray[5].startsWith('hue-rotate')).to.be.true;
    expect(filterFunctionArray[6].startsWith('brightness')).to.be.true;
    expect(filterFunctionArray[7].startsWith('contrast')).to.be.true;
  }

  function testFilterWithNoSheen(filterFunctionArray: string[]): void {
    expect(filterFunctionArray).to.have.lengthOf(6);
    expect(filterFunctionArray[0].startsWith('invert')).to.be.true;
    expect(filterFunctionArray[1].startsWith('sepia')).to.be.true;
    expect(filterFunctionArray[2].startsWith('saturate')).to.be.true;
    expect(filterFunctionArray[3].startsWith('hue-rotate')).to.be.true;
    expect(filterFunctionArray[4].startsWith('brightness')).to.be.true;
    expect(filterFunctionArray[5].startsWith('contrast')).to.be.true;
  }

  function testFilterFormat(filterResult: string | null, isSheenUsed?: boolean): void {
    expect(filterResult).to.be.a('string');
    const filterFunctionArray = (filterResult as string).split(' ');
    expect(filterFunctionArray).to.be.an('array');
    if (filterFunctionArray) {
      if (isSheenUsed) {
        testFilterWithSheen(filterFunctionArray);
      } else {
        testFilterWithNoSheen(filterFunctionArray);
      }
    }
  }

  function testResult(result: ColorToFilterResult, options: Options): void {
    expect(result.error).to.be.undefined;
    expect(result.loss).to.be.a('number');
    testFilterFormat(result.color, options.sheen);
  }

  function testHexadecimal(hexString: string, options: Options): void {
    it(`convert hexadecimal to filter: ${hexString}`, () => {
      const result = CssFilterConverter.hexToFilter(hexString, options);
      testResult(result, options);
    });
  }

  function testRgb(rgbString: string, options: Options): void {
    it(`convert rgb to filter: ${rgbString}`, () => {
      const result = CssFilterConverter.rgbToFilter(rgbString, options);
      testResult(result, options);
    });
  }

  function testHsl(hslString: string, options: Options): void {
    it(`convert hsl to filter: ${hslString}`, () => {
      const result = CssFilterConverter.hslToFilter(hslString, options);
      testResult(result, options);
    });
  }

  function testKeyword(keywordString: KEYWORD, options: Options): void {
    it(`convert keyword to filter: ${keywordString}`, () => {
      const result = CssFilterConverter.keywordToFilter(keywordString, options);
      testResult(result, options);
    });
  }

  function runTests(options: Options) {
    // WORK '#6AA1E0 ' should be trimmed before converting
    ['#6AA1E0', '#aee'].forEach((hexString) => testHexadecimal(hexString, options));

    [
      'rgb(224, 142, 106)',
      '(57, 188, 172)',
      'aaa(57, 188, 172)',
      '57, 188, 172',
      '57. 188. 172',
      '57 188 172',
      'rgb(224, 142, 106) ',
      '57, 188, 172) ',
    ].forEach((rgbString) => testRgb(rgbString, options));

    [
      'hsl(173deg, 53%, 48%)',
      'hsl(173, 53, 48)',
      '(289deg, 62%, 49%)',
      '(289, 62, 49)',
      'aaa(289deg, 62%, 49%)',
      'aaa(289, 62, 49)',
      'hsl(173a, 53b, 48c)',
      '289deg, 62%, 49%',
      '289deg. 62%. 49%',
      '289deg 62% 49%',
      '289, 62, 49',
      '289. 62. 49',
      '289 62 49',
      'hsl(173deg, 53%, 48%) ',
      '289 62 49  ',
    ].forEach((hslString) => testHsl(hslString, options));

    // WORK should be set to lower case before converting and outer spaces should be trimmed
    // ['limegreen', 'royalblue', 'Limegreen', 'ROYALBLUE', 'limegreen '].forEach((keywordString) =>
    ['limegreen', 'royalblue'].forEach((keywordString) => testKeyword(keywordString as KEYWORD, options));
  }

  runTests({ sheen: true });
  runTests({ sheen: false });
});
