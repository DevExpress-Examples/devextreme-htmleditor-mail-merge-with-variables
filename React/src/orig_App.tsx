import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useLayoutEffect,
  MutableRefObject
} from "react";

import HtmlEditor, {
  Toolbar,
  Item,
  Variables
} from "devextreme-react/html-editor";
import { ButtonTypes } from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import { ValueChangedEvent as TextValueChanged } from "devextreme/ui/text_box";
import { ValueChangedEvent as HtmlValueChanged } from "devextreme/ui/html_editor";
import markup, { Name } from "./data";

function useEvent(handler: () => void) {
  const handlerRef: MutableRefObject<any> = useRef(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: []) => {
    const fn: () => void = handlerRef.current;
    return fn(...args);
  }, []);
}

const DX_VARIABLE_CLASS: string = "dx-variable";
const DATA_VAR_VALUE_ATTR: string = "data-var-value";

const variables: Array<string> = ["FirstName", "LastName"];
const escapeCharacters: Array<string> = ["{", "}"];

const replaceVariables = (value: string, variablesMap: Name): string => {
  const parser: DOMParser = new DOMParser();

  const doc: Document = parser.parseFromString(value, "text/html");
  const variables: NodeListOf<Element> = doc.querySelectorAll(
    `.${DX_VARIABLE_CLASS}`
  );

  variables.forEach((variable: Element): void => {
    const variableValue: string =
      variablesMap[variable.getAttribute(DATA_VAR_VALUE_ATTR)];
    variable.outerHTML = variableValue;
  });

  return doc.body.innerHTML.toString();
};

function App(): React.ReactElement {
  const [value, setValue] = useState(markup);
  const [firstNameTextBoxValue, setFirstNameTextBoxValue] = useState("John");
  const [lastNameTextBoxValue, setLastNameTextBoxValue] = useState("Smith");

  const convertVariableOnClick = useEvent((): void => {
    const valueWithReplacedVariables = replaceVariables(value, {
      FirstName: firstNameTextBoxValue,
      LastName: lastNameTextBoxValue
    });

    setValue(valueWithReplacedVariables);
  });

  const htmlEditorOnValueChanged = useCallback((e: HtmlValueChanged): void => {
    setValue(e.value);
  }, []);

  const textBoxOnValueChanged = useCallback((e: TextValueChanged): void => {
    if (e.element.id === "first-name") {
      setFirstNameTextBoxValue(e.value);
    } else if (e.element.id === "last-name") {
      setLastNameTextBoxValue(e.value);
    }
  }, []);

  const toolbarButtonOptions: ButtonTypes.Properties = useMemo(
    () => ({
      text: "Convert HtmlEditor variables",
      onClick: convertVariableOnClick
    }),
    [convertVariableOnClick]
  );

  return (
    <div className="widget-container">
      <HtmlEditor
        value={value}
        onValueChanged={htmlEditorOnValueChanged}
        height={400}
      >
        <Toolbar multiline={true}>
          <Item name="undo" />
          <Item name="redo" />
          <Item name="separator" />
          <Item name="variable" />
          <Item name="separator" />
          <Item name="bold" />
          <Item name="italic" />
          <Item name="strike" />
          <Item name="underline" />
          <Item name="separator" />
          <Item widget="dxButton" options={toolbarButtonOptions} />
        </Toolbar>

        <Variables dataSource={variables} escapeChar={escapeCharacters} />
      </HtmlEditor>

      <TextBox
        id="first-name"
        value={firstNameTextBoxValue}
        label="FirstName"
        labelMode="floating"
        onValueChanged={textBoxOnValueChanged}
      />
      <TextBox
        id="last-name"
        value={lastNameTextBoxValue}
        label="LastName"
        labelMode="floating"
        onValueChanged={textBoxOnValueChanged}
      />
    </div>
  );
}

export default App;
