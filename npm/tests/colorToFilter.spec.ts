/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Options } from '../src/shared/types/options';
import CssFilterConverter from '../src/index';
import { expect } from 'chai';
import 'mocha';

// cannot test exact filter results as they can change on every run
// therefore this test suite can only validate the returned format
describe('Color to filter tests - ', () => {
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

  function testFilterCorrectFormat(filterResult: string | null, isSheenUsed?: boolean): void {
    expect(filterResult).to.be.string;
    const filterFunctionArray = (filterResult as string).split(' ');
    if (filterFunctionArray) {
      if (isSheenUsed) {
        testFilterWithSheen(filterFunctionArray);
      } else {
        testFilterWithNoSheen(filterFunctionArray);
      }
    }
  }

  function runTests(options: Options) {
    it('convert hexadecimal to filter - 1', () => {
      // given
      const hexColor = '#6AA1E0';

      // when
      const result = CssFilterConverter.hexToFilter(hexColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });

    it('convert hexadecimal to filter - 2', () => {
      // given
      const hexColor = '#E08E6A';

      // when
      const result = CssFilterConverter.hexToFilter(hexColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });

    it('convert rgb to filter - 1', () => {
      // given
      const rgbColor = 'rgb(224, 142, 106)';

      // when
      const result = CssFilterConverter.rgbToFilter(rgbColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });

    it('convert rgb to filter - 2', () => {
      // given
      const rgbColor = 'rgb(57, 188, 172)';

      // when
      const result = CssFilterConverter.rgbToFilter(rgbColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });

    it('convert hsl to filter - 1', () => {
      // given
      const hslColor = 'hsl(173deg, 53%, 48%)';

      // when
      const result = CssFilterConverter.hslToFilter(hslColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });

    it('convert hsl to filter - 2', () => {
      // given
      const hslColor = 'hsl(289deg, 62%, 49%)';

      // when
      const result = CssFilterConverter.hslToFilter(hslColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });

    it('convert keyword to filter - 1', () => {
      // given
      const keywordColor = 'limegreen';

      // when
      const result = CssFilterConverter.keywordToFilter(keywordColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });

    it('convert keyword to filter - 2', () => {
      // given
      const keywordColor = 'royalblue';

      // when
      const result = CssFilterConverter.keywordToFilter(keywordColor, options);

      // then
      testFilterCorrectFormat(result.color, options.sheen);
    });
  }

  runTests({ sheen: true });
  runTests({ sheen: false });
});
