export interface LocationMetric {
  name: string;
  totalPatients: number;
  checkedOut: number;
  noShowRiskCount: number;
  productionK: number;
  collectionRate: number;
}

export interface HourlySlot {
  hour: string;
  patients: number;
}
