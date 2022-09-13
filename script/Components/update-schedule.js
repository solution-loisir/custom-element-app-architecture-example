import { insertHTML, clearFrom } from "../utilities/dom.js";
import { scheduleItems } from "../utilities/schedule-items.js";

class UpdateSchedule extends HTMLElement {
  constructor() {
    super();
    const self = this;

    window.addEventListener("Dashboard:render", (event) => {
      const props = event.detail;
      clearFrom(self);
      if(Object.keys(props.ScheduleData).length) {
        const scheduleItemsMarkup = scheduleItems(props.ScheduleData);
        insertHTML(scheduleItemsMarkup, self, "afterend");
      };
    });
  }
};

export {
  UpdateSchedule
}