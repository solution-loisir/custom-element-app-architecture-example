class SpotsTable extends HTMLElement {
  constructor() {
    super();
    const self = this;
    self.totalSpotsData = self.querySelector("#total-spots");
    self.totalSpotsRemainingData = self.querySelector("#total-spots-remaining");
    self.totalSpotsReservedData = self.querySelector("#total-spots-reserved");

    window.addEventListener("Dashboard:render", (event) => {
      const props = event.detail;
      self.totalSpotsData.textContent = props.SpotsStats.TotalSpots;
      self.totalSpotsRemainingData.textContent = props.SpotsStats.TotalSpotsRemaining;
      self.totalSpotsReservedData.textContent = props.SpotsStats.TotalSpotsReserved;
    });
  }
};

export {
  SpotsTable
};