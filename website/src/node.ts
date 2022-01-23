const fs = require('fs');

export default class Node {
  public static import() {
    fs.readFile('/Users/joe/test.txt', 'utf8', (err: unknown, data: unknown) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });
  }
}
