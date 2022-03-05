/* eslint-disable @typescript-eslint/no-unused-expressions */
import CssFilterConverter from '../src/index';
import { expect } from 'chai';
import 'mocha';

// cannot test exact filter results as they can change on every run
// therefore this test suite can only validate the returned format
describe('Color to filter tests - ', () => {
  function testFilterCorrectFormat(filterResult: string | null): void {
    const resultArray = filterResult?.split(' ');
    if (resultArray) {
      expect(resultArray[0].startsWith('brightness')).to.be.true;
      expect(resultArray[1].startsWith('saturate')).to.be.true;
      expect(resultArray[2].startsWith('invert')).to.be.true;
      expect(resultArray[3].startsWith('sepia')).to.be.true;
      expect(resultArray[4].startsWith('saturate')).to.be.true;
      expect(resultArray[5].startsWith('hue-rotate')).to.be.true;
      expect(resultArray[6].startsWith('brightness')).to.be.true;
      expect(resultArray[7].startsWith('contrast')).to.be.true;
    }
  }

  it('convert hexadecimal to filter - 1', () => {
    // given
    const hexColor = '#6AA1E0';

    // when
    const result = CssFilterConverter.hexToFilter(hexColor);

    // then
    testFilterCorrectFormat(result.color);
  });

  it('convert hexadecimal to filter - 2', () => {
    // given
    const hexColor = '#E08E6A';

    // when
    const result = CssFilterConverter.hexToFilter(hexColor);

    // then
    testFilterCorrectFormat(result.color);
  });

  it('convert rgb to filter - 1', () => {
    // given
    const rgbColor = 'rgb(224, 142, 106)';

    // when
    const result = CssFilterConverter.rgbToFilter(rgbColor);

    // then
    testFilterCorrectFormat(result.color);
  });

  it('convert rgb to filter - 2', () => {
    // given
    const rgbColor = 'rgb(57, 188, 172)';

    // when
    const result = CssFilterConverter.rgbToFilter(rgbColor);

    // then
    testFilterCorrectFormat(result.color);
  });

  it('convert hsl to filter - 1', () => {
    // given
    const hslColor = 'hsl(173deg, 53%, 48%)';

    // when
    const result = CssFilterConverter.hslToFilter(hslColor);

    // then
    testFilterCorrectFormat(result.color);
  });

  it('convert hsl to filter - 2', () => {
    // given
    const hslColor = 'hsl(289deg, 62%, 49%)';

    // when
    const result = CssFilterConverter.hslToFilter(hslColor);

    // then
    testFilterCorrectFormat(result.color);
  });

  it('convert keyword to filter - 1', () => {
    // given
    const keywordColor = 'limegreen';

    // when
    const result = CssFilterConverter.keywordToFilter(keywordColor);

    // then
    testFilterCorrectFormat(result.color);
  });

  it('convert keyword to filter - 2', () => {
    // given
    const keywordColor = 'royalblue';

    // when
    const result = CssFilterConverter.keywordToFilter(keywordColor);

    // then
    testFilterCorrectFormat(result.color);
  });
});
