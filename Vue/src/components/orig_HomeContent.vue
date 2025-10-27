<script setup lang="ts">
import { ref } from "vue";
import "devextreme/dist/css/dx.material.blue.light.compact.css";

import { markup, employees } from "@/data";

import DxHtmlEditor, {DxToolbar, DxToolbarItem, DxVariables, DxMention, DxMediaResizing} from "devextreme-vue/html-editor";
import DxTextBox from "devextreme-vue/text-box";
import DxButton from "devextreme-vue/button";
import { replaceVariables } from "@/replace-variables";

const sizeValues =  ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
const varaiblesDataSource = [ "FirstName", "LastName" ];
const variablesEscapeChar = [ "{", "}" ];

const htmlEditor = ref<DxHtmlEditor>();
const firstName = ref("");
const lastName = ref("");

function onConverClick(){
  const fName = (firstName.value.length > 0) ? firstName.value : "John";
  const lName = (lastName.value.length > 0) ? lastName.value : "Smith";
  
  let value: string = htmlEditor.value?.instance?.option("value");
    
  value = replaceVariables(value,
    {
      "FirstName": fName,
      "LastName": lName
    }
  );

  htmlEditor.value?.instance?.option("value", value);
}
</script>
<template>
  <div>
    <DxHtmlEditor
      ref="htmlEditor"
      height="400"
      :value="markup">
      <DxToolbar>
        <DxToolbarItem name="undo"></DxToolbarItem>
        <DxToolbarItem name="redo"></DxToolbarItem>
        <DxToolbarItem name="separator"></DxToolbarItem>
        <DxToolbarItem name="size" :acceptedValues="sizeValues"></DxToolbarItem>
        <DxToolbarItem name="font" :acceptedValues="fontValues"></DxToolbarItem>
        <DxToolbarItem name="separator"></DxToolbarItem>
        <DxToolbarItem name="bold"></DxToolbarItem>
        <DxToolbarItem name="italic"></DxToolbarItem>
        <DxToolbarItem name="strike"></DxToolbarItem>
        <DxToolbarItem name="underline"></DxToolbarItem>
        <DxToolbarItem name="separator"></DxToolbarItem>
        <DxToolbarItem name="variable"></DxToolbarItem>
      </DxToolbar>
      <DxVariables
        :dataSource="varaiblesDataSource"
        :escapeChar="variablesEscapeChar">
      </DxVariables>
      <DxMention
        :dataSource="employees"
        searchExpr="text"
        displayExpr="text"
        valueExpr="text">
      </DxMention>
      <DxMediaResizing
        :enabled="true"
      ></DxMediaResizing>
    </DxHtmlEditor>

    <DxTextBox
      v-model:value='firstName'
      labelMode='floating'
      label="FirstName - Default: 'John'"
    ></DxTextBox>
    <DxTextBox
      v-model:value='lastName'
      labelMode='floating'
      label="Last Name - Default: 'Smith'"
    ></DxTextBox>
    <DxButton
      text="Convert HtmlEditor varaibles"
      :onClick='onConverClick'
    ></DxButton>
  </div>
</template>
