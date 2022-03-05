/* eslint-disable max-len */
import CssFilterConverter from '../src/index';
import { expect } from 'chai';
import 'mocha';

describe('Filter to color tests - ', () => {
  it('convert filter to hexadecimal - 1', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)';
    const expectedHexColor = '#6AA1E0';

    // when
    const result = await CssFilterConverter.filterToHex(filter);

    // then
    expect(result.color).to.equal(expectedHexColor);
  });

  it('convert filter to hexadecimal - 2', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)';
    const expectedHexColor = '#2D6963';

    // when
    const result = await CssFilterConverter.filterToHex(filter);

    // then
    expect(result.color).to.equal(expectedHexColor);
  });

  it('convert filter to rgb - 1', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)';
    const expectedRgbColor = [106, 161, 224];

    // when
    const result = await CssFilterConverter.filterToRgb(filter);

    // then
    expect(result.color?.toString()).to.equal(expectedRgbColor.toString());
  });

  it('convert filter to rgb - 2', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)';
    const expectedRgbColor = [45, 105, 99];

    // when
    const result = await CssFilterConverter.filterToRgb(filter);

    // then
    expect(result.color?.toString()).to.equal(expectedRgbColor.toString());
  });

  it('convert filter to hsl - 1', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(60%) sepia(67%) saturate(308%) hue-rotate(172deg) brightness(88%) contrast(100%)';
    const expectedHslColor = [212, 66, 65];

    // when
    const result = await CssFilterConverter.filterToHsl(filter);

    // then
    expect(result.color?.toString()).to.equal(expectedHslColor.toString());
  });

  it('convert filter to hsl - 2', async () => {
    // given
    const filter =
      'brightness(0) saturate(100%) invert(35%) sepia(48%) saturate(388%) hue-rotate(125deg) brightness(93%) contrast(99%)';
    const expectedHslColor = [174, 40, 29];

    // when
    const result = await CssFilterConverter.filterToHsl(filter);

    // then
    expect(result.color?.toString()).to.equal(expectedHslColor.toString());
  });
});
