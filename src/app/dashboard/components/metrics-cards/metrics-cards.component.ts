import { Component, Input } from '@angular/core';
import { Report } from '../../../models/report.model';

@Component({
  selector: 'app-metrics-cards',
  templateUrl: './metrics-cards.component.html',
})
export class MetricsCardsComponent {
  @Input() report: Report | null = null;
}
