# Custom-element-app-architecture-example
Example of a small vanilla JavaScript app using custom elements for components. This is an open source version of an existing app.
## What is it?
This is a multi page app (MPA) setup with implicit state (no browser router) using [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for dynamic components. The app itself is a dashboard to visualize data from an API. The static part of the app is prerendered using the always robust [11ty](https://www.11ty.dev/) static site genenrator. In this demo, there is only one page. It is akin of the [Islands architecture](https://jasonformat.com/islands-architecture/) as well as the [Jamstack](https://jamstack.org/) architectural approach.
## Context
Following a short [coversation](https://twitter.com/1Marc/status/1568966311346315265?t=HgFcStF-e9dP1kJf8a8jkg&s=19) with [@1Marc](https://twitter.com/1Marc) over his excellent [to-do MVC](https://github.com/1Marc/todomvc-vanillajs-2022) (read the full blog post [here](https://frontendmasters.com/blog/vanilla-javascript-todomvc/)). I decided to extract a demo from an existing app to demonstrate how I use [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) in combination with some of the conventions exposed by Marc to produce a vanilla app with components. This is just a proof of concept, the real is more complex and involve access control and data fetching.
## How it works
The base structure is very similar to the **to-do MVC**. The app itself is an object and to "start" the app, the `init()` as to be called. How it differs from Marc's app is in the "components". In this case, every component is a custom element which is cumunicating with the other components using custom events on the `window` object. Each components may be responsible for the state of the app and dispatching the proper event to rerender the other components listening. The `props` are passed down to components via the custom event [detail property](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#example).
## HTML is the template
Instead of rendering the markup through JavaScript, we free up **HTML** to do what it is best at: rendering itself! Everywhere we need dynamic fuctionnalities, we enclose that area with a custom element which will be in charge the area dynamic rendering. For example in this app we have a `select` input to let the user choose which program she wants to see the data for. It looks like this:

```html
<!-- /src/index.njk -->

<select-program-name class="flex-column-center">
  <select id="select-names">
    <option value="" selected>Téléchargement des données...</option>
  </select>
</select-program-name>
```
Instead of giving the responsability to `select-program-name` to render its children, we just enclose the children by the custom element parent. We now have scoped markup controled by `select-program-name`. Lets look at how this outer element looks like.

```js
// /script/Components/select-program-name.js

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
```
The neat thing about custom elements is that they can refer to themselves! Here we see a component that on user input, updates the state of the app and then render the dependent components through a `window` custom event with `props`! I'd like to thank Marc Grabanski for the nice DOM utilities and the overall structure exposed in its original project!