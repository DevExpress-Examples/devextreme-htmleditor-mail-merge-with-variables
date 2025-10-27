<script setup lang='ts'>
import { ref } from 'vue';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { markup } from '@/data';
import DxHtmlEditor, { DxToolbar, DxToolbarItem, DxVariables } from 'devextreme-vue/html-editor';
import DxTextBox from 'devextreme-vue/text-box';
import { replaceVariables } from '@/replace-variables';

const variablesDataSource = [ 'FirstName', 'LastName' ];
const variablesEscapeChar = [ '{', '}' ];

const firstName = ref('');
const lastName = ref('');
const editorValue = ref(markup);

function onConvertClick() {
  const fName = (firstName.value.length > 0) ? firstName.value : 'John';
  const lName = (lastName.value.length > 0) ? lastName.value : 'Smith';

  editorValue.value = replaceVariables(editorValue.value,
    {
      'FirstName': fName,
      'LastName': lName
    }
  );
}

const toolbarButtonOptions = {
  text: 'Convert HtmlEditor varaibles',
  onClick: onConvertClick
};

</script>
<template>
  <div>
    <DxHtmlEditor
      height="400"
      v-model:value="editorValue"
    >
      <DxToolbar>
        <DxToolbarItem name="undo"/>
        <DxToolbarItem name="redo"/>
        <DxToolbarItem name="separator"/>
        <DxToolbarItem name="variable"/>
        <DxToolbarItem name="separator"/>
        <DxToolbarItem name="bold"/>
        <DxToolbarItem name="italic"/>
        <DxToolbarItem name="strike"/>
        <DxToolbarItem name="underline"/>
        <DxToolbarItem name="separator"/>
        <DxToolbarItem
          widget="dxButton"
          :options="toolbarButtonOptions"
        />
      </DxToolbar>
      <DxVariables
        :data-source="variablesDataSource"
        :escape-char="variablesEscapeChar"
      />
    </DxHtmlEditor>

    <DxTextBox
      v-model:value="firstName"
      label-mode="floating"
      label="FirstName - Default: John"
    />
    <DxTextBox
      v-model:value="lastName"
      label-mode="floating"
      label="Last Name - Default: Smith"
    />
    <!-- <DxButton
      text='Convert HtmlEditor varaibles'
      :onClick='onConvertClick'
    ></DxButton> -->
  </div>
</template>
