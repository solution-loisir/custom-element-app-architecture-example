import { priceFormat } from "../utilities/priceFormat.js";
import { priceAccumulator } from "../utilities/price-accumulator.js";

class FinancesTable extends HTMLElement {
  constructor() {
    super();
    const self = this;
    self.revenuPotentiel = self.querySelector("#revenu-potentiel");
    self.revenuActuel = self.querySelector("#revenu-actuel");
    self.revenuManque = self.querySelector("#revenu-manque");

    window.addEventListener("Dashboard:render", (event) => {
      const props = event.detail;
      const stats = {
        totalRevenu: priceAccumulator(props, "MaxAttendance"),
        acquiredRevenu: priceAccumulator(props, "SpotsReserved"),
        manqueRevenu: priceAccumulator(props, "SpotsRemaining")
      };
      self.revenuPotentiel.textContent = priceFormat(stats.totalRevenu);
      self.revenuActuel.textContent = priceFormat(stats.acquiredRevenu);
      self.revenuManque.textContent = priceFormat(stats.manqueRevenu);
    });
  }
};

export {
  FinancesTable
};