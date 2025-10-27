import { Component, ViewChild } from '@angular/core';
import { DxHtmlEditorComponent } from "devextreme-angular/ui/html-editor";
import { replaceVariables } from "./replace-variables";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("editor", { static: false }) htmlEditor!: DxHtmlEditorComponent;

  title = 'Angular';
  initialValue: string = `<p>This is a demo to illustrate how to parse and convert variables. To get started, input several variables into the editor, type the variable's values in the TextBoxes below, and click the "Convert HtmlEditor variables" button.</p>`;
  firstName: string = "";
  lastName: string = "";

  convertVariableOnClick() {
    const firstName = (this.firstName.length > 0) ? this.firstName : "John";
    const lastName = (this.lastName.length > 0) ? this.lastName : "Smith";
    let value: string = this.htmlEditor?.instance.option("value");
    
    value = replaceVariables(value,
      {
        "FirstName": firstName,
        "LastName": lastName
      }
    );

    this.htmlEditor?.instance.option("value", value);
  }

  constructor() {
    this.convertVariableOnClick = this.convertVariableOnClick.bind(this);
  }
}