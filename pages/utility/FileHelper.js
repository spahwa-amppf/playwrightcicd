const fs = require('fs');
const path = require('path');


class FileHelper {
  constructor(downloadDir) {
    this.downloadDir = downloadDir;
    this.filePath = null;
    this.name = null;
  }

setupDownloadDir() {
  if (!fs.existsSync(this.downloadDir)) {
    fs.mkdirSync(this.downloadDir, { recursive: true });
  }

  const files = fs.readdirSync(this.downloadDir);
  for (const file of files) {
    const fullPath = path.join(this.downloadDir, file);

    // Always check existence BEFORE calling lstatSync
    if (!fs.existsSync(fullPath)) {
      console.warn(`File already missing, skipping: ${fullPath}`);
      continue;
    }

    let stats;
    try {
      stats = fs.lstatSync(fullPath);
    } catch (err) {
      console.error(`Failed to stat file ${fullPath}: ${err.message}`);
      continue;
    }

    try {
      if (stats.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });

      } else {
        fs.unlinkSync(fullPath);

      }
    } catch (err) {
      console.error(`Failed to delete ${fullPath}: ${err.message}`);
    }
  }
}

  setFileDetails(filePath, name) {
    this.filePath = filePath;
    this.name = name;
  }

  validateDownload() {
    if (!this.filePath || !this.name) {
      throw new Error("File path or base name is not set.");
    }

    const exists = fs.existsSync(this.filePath);
    if (!exists) {
      throw new Error(`File does not exist: ${this.filePath}`);
    }

    const fileName = path.basename(this.filePath);
    if (!fileName.startsWith(this.name)) {
      throw new Error(`File name ${fileName} does not start with expected name ${this.name}`);
    }


  }
}

FileHelper.DEFAULT_DOWNLOAD_DIR = path.resolve(__dirname, '../../../downloads');
module.exports = FileHelper;
