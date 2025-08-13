// PdfFieldExtractor.js
// Utility to extract form field names from a PDF using pdf-lib
const { PDFDocument } = require('pdf-lib');

class PdfFieldExtractor {
  /**
   * Extract all form field names and their values from a PDF buffer
   * @param {Buffer} pdfBuffer
   * @returns {Promise<Object>} - { fieldName: value, ... }
   */
  static async extractFormFieldNamesAndValues(pdfBuffer) {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const result = {};
    for (const f of fields) {
      const name = f.getName();
      let value = null;
      try {
        value = f.getText ? f.getText() : (f.getValue ? f.getValue() : null);
      } catch (e) {
        value = null;
      }
      result[name] = value;
    }
    return result;
  }
  /**
   * Extract all form field names from a PDF buffer
   * @param {Buffer} pdfBuffer
   * @returns {Promise<string[]>}
   */
  static async extractFormFieldNames(pdfBuffer) {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    return fields.map(f => f.getName());
  }
}

module.exports = PdfFieldExtractor;
