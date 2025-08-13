const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

class PdfValidator {
  static extractZip(zipPath, extractToDir) {
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractToDir, true);
    return fs.readdirSync(extractToDir)
             .filter(file => file.endsWith('.pdf'))
             .map(file => path.join(extractToDir, file));
  }

  static findPdfByName(files, keyword) {
    return files.find(filePath => path.basename(filePath).includes(keyword));
  }

  static async validatePdfContainsText(pdfPath, expectedTexts) {
    const data = await pdf(fs.readFileSync(pdfPath));
    const content = data.text;
    for (const text of expectedTexts) {
      if (!content.includes(text)) {
        throw new Error(`❌ Text not found in PDF: "${text}"`);
      }
    }

  }
}

module.exports = PdfValidator;
