class ProgramName extends HTMLElement {
  constructor() {
    super();
    const self = this;
    self.progName = self.querySelector("#program-name");

    window.addEventListener("Dashboard:render", (event) => {
      const props = event.detail;
      self.progName.textContent = props.Name;
    });
  }
};

export {
  ProgramName
};