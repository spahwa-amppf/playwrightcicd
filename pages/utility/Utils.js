class Utils {
  constructor(page) {
    this.page = page;
  }

  /**
   * Replace placeholders in an object (deep) with values from a mapping object.
   * @param {Object} obj - The object with placeholders (e.g., apiRequestBody.json loaded as JS object)
   * @param {Object} mapping - The mapping object (e.g., formIdMapping.json loaded as JS object)
   * @returns {Object} New object with placeholders replaced
   */
  static mapPlaceholders(obj, mapping) {
    if (typeof obj === 'string') {
      // If string is a placeholder, replace from mapping
      if (obj.startsWith('$') && mapping[obj.substring(1)]) {
        return mapping[obj.substring(1)];
      }
      return obj;
    } else if (Array.isArray(obj)) {
      return obj.map(item => Utils.mapPlaceholders(item, mapping));
    } else if (typeof obj === 'object' && obj !== null) {
      const result = {};
      for (const key in obj) {
        result[key] = Utils.mapPlaceholders(obj[key], mapping);
      }
      return result;
    }
    return obj;
  }
 

  getTextboxLocator(fieldName) {
    return this.page.locator(`//amp-ob-textbox[contains(@params, "fieldName:'${fieldName}'")]//input[@type='text']`);
  }

  getDropdownLocator(fieldName) {
    return this.page.locator(`//amp-ob-dropdownlist[contains(@params, "fieldName:'${fieldName}'")]//select`);
  }

  getDatepickerLocator(fieldName) {
    return this.page.locator(`//amp-ob-datepicker[contains(@params, "fieldName:'${fieldName}'")]//input[@type='text']`);
  }

getRadioButtonLocator(fieldName, value) {
  return this.page.locator(`input[type="radio"][name="${fieldName}"][value="${value}"]`);
}

getLocatorByText(text) {
  return this.page.getByText(text);
}

getLocatorByPlaceholder(placeholder) {
  return this.page.getByPlaceholder(placeholder);
}

getLocatorByRoleAndName(role, name) {
  return this.page.getByRole(role, { name });
}

getLocatorByTitle(title) {
  return this.page.locator(`a[title="${title}"]`);
}

getModalWorkflowSelection(workflowName) {
  return this.page.locator('#modalWorkflow').getByText(workflowName);
}

getFileUploadLocatorByFieldName(fieldName) {
    return this.page.locator(`//amp-ob-fileattachment[contains(@params, "fieldName:'${fieldName}'")]//input[@type='file']`);
  }

  getTextAreaLocator(fieldName) {
    return this.page.locator(`//amp-ob-textarea[contains(@params, "fieldName:'${fieldName}'")]//textarea`);
  }

  
  getCheckboxLocator(fieldName) {
    return this.page.locator(`//amp-ob-checkbox[contains(@params, "fieldName:'${fieldName}'")]//input[@type='checkbox']`);
  }

  
}

/**
 * Replace a single placeholder property in an object using a mapping object.
 * @param {Object} obj - The object with a property to map (e.g., { id: "$IRA_APPLICATION_FORM_ID" })
 * @param {string} property - The property name to map (e.g., "id")
 * @param {Object} mapping - The mapping object (e.g., formIdMapping.json loaded as JS object)
 * @returns {Object} New object with the property mapped if placeholder found
 */
function mapProperty(obj, property, mapping) {
  if (
    obj &&
    typeof obj[property] === 'string' &&
    obj[property].startsWith('$') &&
    mapping[obj[property].substring(1)]
  ) {
    return { ...obj, [property]: mapping[obj[property].substring(1)] };
  }
  return obj;
}

module.exports = Utils;
module.exports.mapProperty = mapProperty;