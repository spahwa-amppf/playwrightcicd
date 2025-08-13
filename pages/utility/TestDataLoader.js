const fs = require('fs');
const path = require('path');

class TestDataLoader {
  static load(fileName) {
    const filePath = path.resolve(process.cwd(), `./Features/Team4/data/${fileName}`);
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData); // returns entire object
  }

  static getEntry(fileName, entryKey) {
    const allData = this.load(fileName);
    return allData[entryKey]; // returns a specific entry
  }

  static getAllEntries(fileName) {
    const allData = this.load(fileName);
    return Object.entries(allData).map(([key, value]) => ({
      key,
      ...value,
    }));
  }
}

module.exports = TestDataLoader;
