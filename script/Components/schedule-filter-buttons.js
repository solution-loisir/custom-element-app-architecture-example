import {  delegate, addClass, removeAllClass } from "../utilities/dom.js";

class ScheduleFilterButtons extends HTMLElement {
  constructor() {
    super();
    const self = this;
    self.scheduleFiltersButtons = self.querySelectorAll('[data-class="filter-button"]');

    window.addEventListener("Dashboard:render", () => {
      removeAllClass(self.scheduleFiltersButtons, "active-button");
    });

    delegate(self, '[data-class="filter-button"]', "click", (event) => {
      const target = event.target;
      const filter = target.dataset.show;

      removeAllClass(self.scheduleFiltersButtons, "active-button");
      addClass(target, "active-button");
      
      self.filterSchedule(filter);
    });
  }

  filterSchedule(filter) {
    const allScheduleItems = document.querySelectorAll('[data-class="schedule-item"]');
    removeAllClass(allScheduleItems, "visually-hidden");
  
    if(filter === "remaining") {
      allScheduleItems.forEach(item => {
        if(item.dataset.state === "complet") {
          addClass(item, "visually-hidden");
        };
      });
    };
    if(filter === "full") {
      allScheduleItems.forEach(item => {
        if(item.dataset.state !== "complet") {
          addClass(item, "visually-hidden");
        };
      });
    };
  }
};

export {
  ScheduleFilterButtons
};