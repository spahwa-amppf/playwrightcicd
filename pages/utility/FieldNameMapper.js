
// This function clears all the 'name' fields in the apiRequestBody.json file.
// It is used to reset the file after a test so that no old field names remain.
// The function takes the path to the apiRequestBody.json file as input.
function cleanApiRequestBodyNames(apiRequestBodyPath) {
  const fs = require('fs');
  try {
    // Read the JSON file from disk
    const data = JSON.parse(fs.readFileSync(apiRequestBodyPath, 'utf-8'));
    // Check if the file has a 'forms' array
    if (Array.isArray(data.forms)) {
      // For each form, check if it has a 'fields' array
      data.forms.forEach(form => {
        if (Array.isArray(form.fields)) {
          // For each field, set the 'name' property to an empty string
          form.fields.forEach(field => {
            field.name = '';
          });
        }
      });
    }
    // Write the updated data back to the file
    fs.writeFileSync(apiRequestBodyPath, JSON.stringify(data, null, 2));

  } catch (err) {
    console.error('Failed to clean name fields in apiRequestBody.json:', err);
  }
}

// This function updates the 'name' fields in the apiRequestBody.json file.
// It matches placeholder values (like "$firstNameTF") to real field names from the API response.
// It takes two inputs:
//   - fieldsArray: the list of fields from apiRequestBody.json that need updating
//   - apiFields: the list of fields from the API response, each with a fieldName
// The function returns a new array of fields with the correct 'name' values filled in.
function mapFieldNames(fieldsArray, apiFields) {
  // This object tells the function which keywords to look for in the API field names for each placeholder
  const placeholderToKeywords = {
    "$firstNameTF": ["first"],
    "$lastNameTF": ["last"],
    "$dobOrTrustDate": ["dob", "date", "birth"],
    "$emailAddress": ["email"],
    "$stateTF": ["state"],
    "$mobilePhoneTF": ["phone", "mobile"]
  };

  // Go through each field in the input array
  return fieldsArray.map(field => {
    // Always attempt to update the field's name, regardless of its current value
    const placeholder = field.value;
    const keywords = placeholderToKeywords[placeholder];

    // Try to get a section hint for more accurate matching
    const sectionHint = field.sectionHint || (field.name && field.name.match(/Section\d+\[0\]\.border\[0\]\.(\w+)/) ? field.name.match(/Section\d+\[0\]\.border\[0\]\.(\w+)/)[1] : null);
    // If there is a section hint, we want to find a field name that includes it
    const mustInclude = sectionHint ? sectionHint : ((field.name && field.name.includes('ContactInfo_baseline[0]')) ? 'ContactInfo_baseline[0]' : null);

    if (keywords) {
      let apiField;
      // First, try to find an API field name that includes the section hint, matches a keyword, and ends with 'TF[0]'
      if (mustInclude) {
        apiField = apiFields.find(f =>
          f.fieldName.includes(mustInclude) &&
          keywords.some(keyword => f.fieldName.toLowerCase().includes(keyword)) &&
          f.fieldName.endsWith('TF[0]')
        );
      }
      // If not found, try to find any field name that matches a keyword and ends with 'TF[0]'
      if (!apiField) {
        apiField = apiFields.find(f =>
          keywords.some(keyword => f.fieldName.toLowerCase().includes(keyword)) &&
          f.fieldName.endsWith('TF[0]')
        );
      }
      // If still not found, try to find any field name that matches a keyword
      if (!apiField) {
        apiField = apiFields.find(f =>
          keywords.some(keyword => f.fieldName.toLowerCase().includes(keyword))
        );
      }
      // If a match is found, update the field's name
      if (apiField) {
        return { ...field, name: apiField.fieldName };
      }
    }
    // If no match is found, leave the field unchanged
    return field;
  });
}

// Export the functions so they can be used in other files
module.exports = { mapFieldNames, cleanApiRequestBodyNames };
