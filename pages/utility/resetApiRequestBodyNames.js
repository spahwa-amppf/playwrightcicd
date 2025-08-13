// Script to reset all 'name' fields in apiRequestBody.json to empty after tests
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../Features/Team4/data/apiRequestBody.json');

const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

if (Array.isArray(data.forms)) {
  data.forms.forEach(form => {
    if (Array.isArray(form.fields)) {
      form.fields.forEach(field => {
        field.name = '';
      });
    }
  });
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

