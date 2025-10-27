const DX_VARIABLE_CLASS = 'dx-variable';
const DATA_VAR_VALUE_ATTR = 'data-var-value';

/**
 * Contains `key: value` pairs of variables for HtmlEditor.
 * { 'FirstName': 'John', 'LastName': 'Smith' }
 */
type Variable = {
  [key: string]: string;
}

/**
 * This method parses HTML string and swaps variables with real values
 * @param value Value must come from HtmlEditor's value property
 * @param variablesMap Must contain `key: value` pairs of variable content. e.g. `{ 'FirstName': 'John', 'LastName': 'Smith' }`
 * @returns Processed HTML string. Assign this value back to HtmlEditor's value property
 */
export function replaceVariables(value: string, variablesMap: Variable): string {
  const parser = new DOMParser();

    const doc = parser.parseFromString(value, 'text/html');
  const variables = doc.querySelectorAll(`.${DX_VARIABLE_CLASS}`);
	
  variables.forEach(variable => {
    const variableValue = variablesMap[variable.getAttribute(DATA_VAR_VALUE_ATTR) || ''];
    variable.outerHTML = variableValue;
  });
	
  return doc.body.innerHTML.toString();
}