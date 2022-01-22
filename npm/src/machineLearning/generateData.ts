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

  public static generateProcedurallyToMaxIndex(maxIndex: number): { training: Data; test: Data } {
    const trainingData: number[][] = [];
    const trainingLabels: number[][] = [];
    const testData: number[][] = [];
    const testLabels: number[][] = [];
    let testDataIndex = 0;
    let currentNumber = 1;
    for (let i = 1; i < maxIndex; i += 1) {
      for (let y = 1; y < maxIndex; y += 1) {
        for (let z = 1; z < maxIndex; z += 1) {
          const rgb = `rgb(${i},${y},${z})`;
          const result = FilterCssConverter.rgbToFilter(rgb);
          const resultNumbers =
            result.filter?.match(GenerateData.NUMBER_PATTERN)?.map((stringNumber) => Number.parseInt(stringNumber)) ||
            [];
          if (testDataIndex === 5) {
            testData.push(resultNumbers?.slice(2));
            testLabels.push([currentNumber]);
            testDataIndex = 0;
          } else {
            trainingData.push(resultNumbers?.slice(2));
            trainingLabels.push([currentNumber]);
          }
          testDataIndex += 1;
          currentNumber += 1;
        }
      }
    }
    const training = { data: trainingData, labels: trainingLabels };
    const test = { data: testData, labels: testLabels };
    return { training, test };
  }
}
