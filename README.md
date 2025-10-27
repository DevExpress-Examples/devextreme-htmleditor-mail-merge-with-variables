<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/633913710/22.2.6%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1162966)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# HtmlEditor for DevExtreme - How to implement mail merge with variables

The HtmlEditor component supports [variables](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxHtmlEditor/Configuration/variables/). This example demonstrates how to implement mail merge with variables.

The application contains HtmlEditor and two TextBoxes. Type values in the TextBoxes to see them merged with HtmlEditor text.

![HtmlEditor - Mail merge](/HtmlEditor%20-%20Mail%20merge.png)

The core implementation for mail merge can be found within the `replaceVariables(value, variablesMap)` utility method. The method accepts two parameters: HtmlEditor's [value](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxHtmlEditor/Configuration/#value) and an object map. These parameters are used to parse the value, then to find and replace the variables based on the map object.

```
const DX_VARIABLE_CLASS = 'dx-variable';
const DATA_VAR_VALUE_ATTR = 'data-var-value';

/*
value: dxHtmlEditor.value
variableMap: object = Must contain `key: value` pairs of variable content.
    {
        'FirstName': 'John',
        'LastName': 'Smith'
    }
*/
const replaceVariables = (value, variablesMap) => {
    const parser = new DOMParser();

    replaceVariables = (value, variablesMap) => {
        const doc = parser.parseFromString(value, 'text/html');
        const variables = doc.querySelectorAll(`.${DX_VARIABLE_CLASS}`);

        variables.forEach(variable => {
            const variableValue = variablesMap[variable.getAttribute(DATA_VAR_VALUE_ATTR)];
            variable.outerHTML = variableValue;
        });

        return doc.body.innerHTML.toString();
    }

    return replaceVariables(value, variablesMap);
};
```

## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **Vue**
    - [Home.vue](Vue/src/components/HomeContent.vue)
- **React**
    - [App.tsx](React/src/App.tsx)
- **NetCore**    
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [Getting Started with HtmlEditor](https://js.devexpress.com/Documentation/Guide/UI_Components/HtmlEditor/Getting_Started_with_HtmlEditor/)
- [HtmlEditor - Variables](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxHtmlEditor/Configuration/variables/)
<!-- feedback -->
## Does this example address your development requirements/objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-htmleditor-mail-merge-with-variables&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-htmleditor-mail-merge-with-variables&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
