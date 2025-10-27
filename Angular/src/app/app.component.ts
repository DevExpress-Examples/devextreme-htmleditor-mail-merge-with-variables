import { Component } from '@angular/core';
import { DxHtmlEditorModule, DxTextBoxModule } from 'devextreme-angular';
import { replaceVariables } from './replace-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [DxHtmlEditorModule, DxTextBoxModule],
})
export class AppComponent {
  editorValue = '<p>This is a demo to illustrate how to parse and convert variables. To get started, input several variables into the editor, type the variable\'s values in the TextBoxes below, and click the \'Convert HtmlEditor variables\' button.</p>';

  firstName = '';

  lastName = '';

  constructor() {
    this.convertVariableOnClick = this.convertVariableOnClick.bind(this);
  }

  convertVariableOnClick(): void {
    const firstName = this.firstName.length > 0 ? this.firstName : 'John';
    const lastName = this.lastName.length > 0 ? this.lastName : 'Smith';
    this.editorValue = replaceVariables(
      this.editorValue,
      {
        FirstName: firstName,
        LastName: lastName,
      },
    );
  }
}
