const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

class PdfUtils {
  static async extractTextFromBuffer(buffer) {
    const pdfData = await pdf(buffer);
    return pdfData.text;
  }

  static getLatestZipFile(downloadDir) {
    const files = fs.readdirSync(downloadDir);
    const zipFiles = files.filter(file => file.endsWith('.zip'));
    if (zipFiles.length === 0) throw new Error('No ZIP files found in download directory');
    return zipFiles
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(downloadDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time)[0].name;
  }

  static getPdfBufferFromZip(zipPath, pdfNameContains = 'contributory') {
    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();
    const pdfEntries = zipEntries.filter(entry =>
      entry.entryName.toLowerCase().endsWith('.pdf') &&
      entry.entryName.toLowerCase().includes(pdfNameContains.toLowerCase())
    );
    if (pdfEntries.length === 0) throw new Error('No matching PDF found in downloaded ZIP file');
    return {
      buffer: pdfEntries[0].getData(),
      name: pdfEntries[0].entryName
    };
  }

  static extractWords(text) {
    return text
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 3);
  }

  static compareKeyTerms(apiText, downloadedText, keyTerms) {
    let apiMatches = 0;
    let downloadedMatches = 0;
    keyTerms.forEach(term => {
      const apiHasTerm = apiText.toLowerCase().includes(term.toLowerCase());
      const downloadedHasTerm = downloadedText.toLowerCase().includes(term.toLowerCase());
      if (apiHasTerm) apiMatches++;
      if (downloadedHasTerm) downloadedMatches++;
    });
    return { apiMatches, downloadedMatches };
  }

  static getCommonWords(apiText, downloadedText) {
    const apiWords = new Set(PdfUtils.extractWords(apiText));
    const downloadedWords = new Set(PdfUtils.extractWords(downloadedText));
    return Array.from(apiWords).filter(word => downloadedWords.has(word));
  }
}

module.exports = PdfUtils;
