import { Report } from '../../models/report.model';

const UNITS = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'];

const REPORT_TITLES = [
  'Number of Open Alerts',
  'Closing Rate %',
  'Oldest Unacknowledged Alert',
];
const DEFAULT_TITLE = 'Oldest Alert';

let reportIdCounter = 0;

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createReport(index: number): Report {
  const title = REPORT_TITLES[index] ?? DEFAULT_TITLE;

  return {
    id: `report-${Date.now()}-${++reportIdCounter}`,
    title,
    subtitle: '',
    labels: [...UNITS],
    onWatch: UNITS.map(() => random(1, 4)),
    unacknowledged: UNITS.map(() => random(2, 5)),
    acknowledged: UNITS.map(() => random(2, 6)),
    inProcess: UNITS.map(() => random(3, 6)),
    metrics: {
      openAlerts: random(40, 120),
      closingRate: random(40, 90),
      oldestUnackDays: random(60, 140),
    },
  };
}

export function generateReports(count: number = 50): Report[] {
  return Array.from({ length: count }, (_, i) => createReport(i));
}

export function createReportFromInput(title: string, subtitle: string): Report {
  return { ...createReport(0), title, subtitle };
}
