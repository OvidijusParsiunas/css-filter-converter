const fs = require('fs');

export class GenerateCsv {
  public static generate(dataArray: number[][], headers: string[], fileName: string): void {
    let lineArray: string[] = [];
    const data: (number | string)[][] = [headers];
    data.push(...dataArray);
    data.forEach((infoArray: (number | string)[]) => {
      let line = infoArray.join(',');
      lineArray.push(line);
    });
    let csvContent = lineArray.join('\n');
    fs.writeFile(`src/machineLearning/data/${fileName}.csv`, csvContent, (err: unknown) => {
      if (err) return console.error(err);
      console.log('FILE SUCCESSFULLY WRITTEN!');
    });
  }
}
