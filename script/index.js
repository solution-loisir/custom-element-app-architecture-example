import { SelectProgramName } from "./Components/select-program-name.js";
import { ProgramName } from "./Components/program-name.js";
import { ScheduleFilterButtons } from "./Components/schedule-filter-buttons.js";
import { SpotsTable } from "./Components/spots-table.js";
import { UpdateSchedule } from "./Components/update-schedule.js";
import { FinancesTable } from "./Components/finances-table.js";
import { data } from "./mock-data.js";

const Dashboard = {
  async init() {
    window.DashboardStore = data;
    
    window.customElements.define("program-name", ProgramName);
    window.customElements.define("select-program-name", SelectProgramName);
    window.customElements.define("schedule-filter-buttons", ScheduleFilterButtons);
    window.customElements.define("update-schedule", UpdateSchedule);
    window.customElements.define("spots-table", SpotsTable);
    window.customElements.define("finances-table", FinancesTable);

    window.dispatchEvent(new CustomEvent("Dashboard:init", {
      detail: window.DashboardStore
    }));

    const initialProps = window.DashboardStore[0];
    window.dispatchEvent(new CustomEvent("Dashboard:render", {
      detail: initialProps
    }));
  }
};

Dashboard.init();