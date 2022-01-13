import { FilterCssConverter } from '../filterCssConverter/filterCssConverter';

export class GenerateData {
  private static NUMBER_PATTERN = /\d+/g;

  public static generate(numberOfItems: number): { data: number[][]; labels: number[][] } {
    const dataArray: number[][] = [];
    const labelsArray: number[][] = [];
    for (let i = 0; i < numberOfItems; i += 1) {
      const randomNumber = Math.floor(Math.random() * 255);
      const rgb = `rgb(${randomNumber},255,0)`;
      const result = FilterCssConverter.rgbToFilter(rgb);
      const resultNumbers =
        result.filter?.match(GenerateData.NUMBER_PATTERN)?.map((stringNumber) => Number.parseInt(stringNumber)) || [];
      dataArray.push(resultNumbers?.slice(2));
      labelsArray.push([randomNumber]);
    }
    return { data: dataArray, labels: labelsArray };
  }
}
