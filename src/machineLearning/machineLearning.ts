import { GenerateData } from './generateData';
import { GenerateCsv } from './generateCsv';

export class MachineLearning {
  public static generateData(): void {
    const trainingData = GenerateData.generate(40000);
    const testData = GenerateData.generate(16000);
    const dataHeaders = ['invert', 'sepia', 'saturate', 'hue-rotate', 'brightness', 'contrast'];
    const labelHeaders = ['result'];
    GenerateCsv.generate(trainingData.data, dataHeaders, 'training-data');
    GenerateCsv.generate(trainingData.labels, labelHeaders, 'training-labels');
    GenerateCsv.generate(testData.data, dataHeaders, 'test-data');
    GenerateCsv.generate(testData.labels, labelHeaders, 'test-labels');
  }
}
