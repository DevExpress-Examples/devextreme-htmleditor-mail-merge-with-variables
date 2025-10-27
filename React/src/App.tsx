import { useCallback, useState, useMemo } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import HtmlEditor, {
  Toolbar,
  Item,
  Variables,
  type HtmlEditorTypes,
} from 'devextreme-react/html-editor';
import TextBox, { type TextBoxTypes } from 'devextreme-react/text-box';
import { type ButtonTypes } from 'devextreme-react/button';
import markup, { DX_VARIABLE_CLASS, DATA_VAR_VALUE_ATTR, type Variable } from './data';
import useEvent from './hooks';

const variables: string[] = ['FirstName', 'LastName'];
const escapeCharacters: string[] = ['{', '}'];

function replaceVariables(value: string, variablesMap: Variable): string {
  const parser: DOMParser = new DOMParser();

  const doc: Document = parser.parseFromString(value, 'text/html');
  const variables: NodeListOf<Element> = doc.querySelectorAll(
    `.${DX_VARIABLE_CLASS}`,
  );

  variables.forEach((variable: Element): void => {
    const variableValue = variablesMap[variable.getAttribute(DATA_VAR_VALUE_ATTR) ?? ''];
    variable.outerHTML = variableValue;
  });

  return doc.body.innerHTML.toString();
}

function App(): JSX.Element {
  const [value, setValue] = useState(markup);
  const [firstNameTextBoxValue, setFirstNameTextBoxValue] = useState('John');
  const [lastNameTextBoxValue, setLastNameTextBoxValue] = useState('Smith');

  const htmlEditorOnValueChanged = useCallback((e: HtmlEditorTypes.ValueChangedEvent): void => {
    setValue(e.value);
  }, []);

  const textBoxOnValueChanged = useCallback((e: TextBoxTypes.ValueChangedEvent): void => {
    if (e.element.id === 'first-name') {
      setFirstNameTextBoxValue(e.value);
    } else if (e.element.id === 'last-name') {
      setLastNameTextBoxValue(e.value);
    }
  }, []);

  const convertVariableOnClick = useEvent((): void => {
    const valueWithReplacedVariables = replaceVariables(value, {
      FirstName: firstNameTextBoxValue,
      LastName: lastNameTextBoxValue,
    });

    setValue(valueWithReplacedVariables);
  });

  const toolbarButtonOptions: ButtonTypes.Properties = useMemo(
    () => ({
      text: 'Convert HtmlEditor variables',
      onClick: convertVariableOnClick,
    }),
    [convertVariableOnClick],
  );

  return (
    <div className='main'>
      <HtmlEditor
        value={value}
        onValueChanged={htmlEditorOnValueChanged}
        height={400}
      >
        <Toolbar multiline={true}>
          <Item name='undo' />
          <Item name='redo' />
          <Item name='separator' />
          <Item name='variable' />
          <Item name='separator' />
          <Item name='bold' />
          <Item name='italic' />
          <Item name='strike' />
          <Item name='underline' />
          <Item name='separator' />
          <Item widget='dxButton' options={toolbarButtonOptions} />
        </Toolbar>
        <Variables dataSource={variables} escapeChar={escapeCharacters} />
      </HtmlEditor>

      <TextBox
        id='first-name'
        value={firstNameTextBoxValue}
        label='FirstName'
        labelMode='floating'
        onValueChanged={textBoxOnValueChanged}
      />

      <TextBox
        id='last-name'
        value={lastNameTextBoxValue}
        label='LastName'
        labelMode='floating'
        onValueChanged={textBoxOnValueChanged}
      />
    </div>
  );
}

export default App;
