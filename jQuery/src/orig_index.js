$(function () {
    const value = `<p>This is a demo to illustrate how to parse and convert variables. To get started, input several variables into the editor, type the variable's values in the TextBoxes below, and click the "Convert HtmlEditor variables" button.</p>`;
    const DX_VARIABLE_CLASS = 'dx-variable';
    const DATA_VAR_VALUE_ATTR = 'data-var-value';

    /*
    value: dxHtmlEditor.value
    variableMap: object = Must contain `key: value` pairs of variable content
        {
            'FirstName': 'John',
            'LastName': 'Smith'
        }
    */
		const replaceVariables = (value, variablesMap) => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(value, 'text/html');
			const variables = doc.querySelectorAll(`.${DX_VARIABLE_CLASS}`);
			
			variables.forEach(variable => {
				const variableValue = variablesMap[variable.getAttribute(DATA_VAR_VALUE_ATTR)];
				variable.outerHTML = variableValue;
			});

			return doc.body.innerHTML.toString();
		};

    const htmlEditor = $("#html-editor").dxHtmlEditor({
        toolbar: {
            multiline: true,
            items: [
                "undo", "redo", "separator",
                "variable", "separator",
                "bold", "italic", "strike", "underline", "separator",
                {
                    widget: "dxButton",
                    options: {
                        text: "Convert HtmlEditor variables",
                        onClick: convertVariableOnClick
                    }
                }
            ]
        },
        variables: {
            dataSource: ["FirstName", "LastName"],
            escapeChar: ["{", "}"]
        },
        value: value,
        height: 400        
    }).dxHtmlEditor("instance");

    const firstNameTextBox = $("#first").dxTextBox({
        label: "FirstName - Default: 'John'",
        labelMode: "floating"
    }).dxTextBox("instance");

    const lastNameTextBox = $("#last").dxTextBox({
        label: "LastName - Default: 'Smith'",
        labelMode: "floating"
    }).dxTextBox("instance");

    function convertVariableOnClick(e) {
        const firstName = firstNameTextBox.option("value") || "John";
        const lastName = lastNameTextBox.option("value") || "Smith";

        const valueWithReplacedVariables = replaceVariables(
            htmlEditor.option("value"),
            {
                "FirstName": firstName,
                "LastName": lastName
            }
        );

        htmlEditor.option("value", valueWithReplacedVariables);
    }
});