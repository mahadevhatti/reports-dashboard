export interface ReportMetrics {
  openAlerts: number;
  closingRate: number;
  oldestUnackDays: number;
}

export interface Report {
  id: string;
  title: string;
  subtitle: string;
  labels: string[];
  onWatch: number[];
  unacknowledged: number[];
  acknowledged: number[];
  inProcess: number[];
  metrics: ReportMetrics;
}
