/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ColorToFilterOptions } from '../../src/shared/types/options';
import { ColorToFilterResult } from '../../src/shared/types/result';
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

  function testFilterFormat(filterResult: string | null, isSheenUsed = true): void {
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

  function testResult(result: ColorToFilterResult, options?: ColorToFilterOptions): void {
    expect(result.error).to.be.undefined;
    expect(result.loss).to.be.a('number');
    testFilterFormat(result.color, options?.sheen);
  }

  function buildTestName(type: string, colorString: string, options?: ColorToFilterOptions) {
    const sheenDescription = options?.sheen !== undefined ? `sheen: ${options.sheen}` : 'no sheen option';
    return `convert ${type} to filter (${sheenDescription}): ${colorString}`;
  }

  function testHexadecimal(hexString: string, options?: ColorToFilterOptions): void {
    it(buildTestName('hexadecimal', hexString, options), () => {
      const result = CssFilterConverter.hexToFilter(hexString, options);
      testResult(result, options);
    });
  }

  function testRgb(rgbString: string, options?: ColorToFilterOptions): void {
    it(buildTestName('rgb', rgbString, options), () => {
      const result = CssFilterConverter.rgbToFilter(rgbString, options);
      testResult(result, options);
    });
  }

  function testHsl(hslString: string, options?: ColorToFilterOptions): void {
    it(buildTestName('hsl', hslString, options), () => {
      const result = CssFilterConverter.hslToFilter(hslString, options);
      testResult(result, options);
    });
  }

  function testKeyword(keywordString: KEYWORD, options?: ColorToFilterOptions): void {
    it(buildTestName('keyword', keywordString, options), () => {
      const result = CssFilterConverter.keywordToFilter(keywordString, options);
      testResult(result, options);
    });
  }

  function runTests(options?: ColorToFilterOptions) {
    ['#6AA1E0', '     #6AA1E0    ', '#aee', '    #aee    '].forEach((hexString) => testHexadecimal(hexString, options));

    ['rgb(224, 142, 106)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'].forEach((rgbString) => testRgb(rgbString, options));

    ['hsl(173deg, 53%, 48%)', 'hsl(0deg, 0%, 0%)', 'hsl(360deg, 100%, 100%)'].forEach((hslString) =>
      testHsl(hslString, options),
    );

    // rgb and hsl converion should be able to handle dynamic cases where input contains noise around valid color digits
    // this works in conjuction with being able to handle the following valid values:
    // rgb(1,2,3)
    // rgb(1%,2%,3%)
    // rgb(1,2,3,0.5)
    // rgb(1 2 3 / 0.5)
    // rgb(1 2 3 / 50%)
    [
      'aaa(57, 100, 100)',
      '                          aaa(57, 100, 100)                   ',
      '215deg, 62%, 49%',
      '215deg. 62%. 49%',
      '215deg 62% 49%',
      'sdfsdf(173a , 53b , 48c)',
      '(215, 62, 49)',
      '57, 100, 100) ',
      '215, 62, 49',
      '215. 62. 49',
      '215 62 49',
      '215 62 49  ',
      '22.4, 100, 100',
      '22.4. 100. 100',
      '22.4 . 100. 100',
      '22.4 . 100. 23 . 100',
      '22.4 6 100. 2 2 5 100',
    ].forEach((colorString) => {
      testRgb(colorString, options);
      testHsl(colorString, options);
    });

    ['limegreen', 'royalblue', 'Limegreen', 'ROYALBLUE', '      royalblue     '].forEach((keywordString) =>
      testKeyword(keywordString as KEYWORD, options),
    );
  }

  runTests();
  runTests({ sheen: true });
  runTests({ sheen: false });
});
