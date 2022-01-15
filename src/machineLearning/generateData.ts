import { FilterCssConverter } from '../filterCssConverter/filterCssConverter';

interface Data {
  data: number[][];
  labels: number[][];
}

export class GenerateData {
  private static NUMBER_PATTERN = /\d+/g;

  public static generate(numberOfItems: number): Data {
    const dataArray: number[][] = [];
    const labelsArray: number[][] = [];
    for (let i = 0; i < numberOfItems; i += 1) {
      const number = i % 255;
      const rgb = `rgb(0,${number},0)`;
      const result = FilterCssConverter.rgbToFilter(rgb);
      const resultNumbers =
        result.filter?.match(GenerateData.NUMBER_PATTERN)?.map((stringNumber) => Number.parseInt(stringNumber)) || [];
      dataArray.push(resultNumbers?.slice(2));
      labelsArray.push([number]);
    }
    return { data: dataArray, labels: labelsArray };
  }
}
