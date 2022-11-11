import React from "react";

export default function useSelectUpDown(selectOptionsId: string) {
  const select = document.getElementById(selectOptionsId) as any;
  const options = select && select.options;

  // options utils
  function moveUp() {
    const selected = [];

    for (let i = 0, iLen = options.length; i < iLen; i++) {
      if (options[i].selected) {
        selected.push(options[i]);
      }
    }

    for (let i = 0, iLen = selected.length; i < iLen; i++) {
      let index = selected[i].index;

      if (index == 0) {
        break;
      }

      let temp = selected[i].text;
      selected[i].text = options[index - 1].text;
      options[index - 1].text = temp;

      temp = selected[i].value;
      selected[i].value = options[index - 1].value;
      options[index - 1].value = temp;

      selected[i].selected = false;
      options[index - 1].selected = true;
    }
  }

  function moveDown() {
    const selected = [];

    for (let i = 0, iLen = options.length; i < iLen; i++) {
      if (options[i].selected) {
        selected.push(options[i]);
      }
    }

    for (let i = selected.length - 1, iLen = 0; i >= iLen; i--) {
      const index = selected[i].index;

      if (index == options.length - 1) {
        break;
      }

      let temp = selected[i].text;
      selected[i].text = options[index + 1].text;
      options[index + 1].text = temp;

      temp = selected[i].value;
      selected[i].value = options[index + 1].value;
      options[index + 1].value = temp;

      selected[i].selected = false;
      options[index + 1].selected = true;
    }
  }

  function getAllOption() {
    const options = [];
    for (const iterator of select) {
      options.push(iterator?.value);
    }
    return options;
  }

  return { moveUp, moveDown, getAllOption };
}
