import { insertHTML, clear } from "../utilities/dom.js";

class SelectProgramName extends HTMLElement {
  constructor() {
    super();
    const self = this;
    self.selectNames = self.querySelector("#select-names");

    window.addEventListener("Dashboard:init", (event) => {
      const props = event.detail;
      clear(self.selectNames);
      props.map(item => item.Name).forEach(name => {
        insertHTML(`<option value="${name}">${name}</option>`, self.selectNames);
      });
    });

    self.selectNames.addEventListener("input", event => {
      const target = event.target;
      const selectValue = target.options[target.selectedIndex].value;
      const props = window.DashboardStore.filter(object => object.Name === selectValue)[0];
  
      window.dispatchEvent(new CustomEvent("Dashboard:render", {
        detail: props
      }));
    });
  }
};

export {
  SelectProgramName
};