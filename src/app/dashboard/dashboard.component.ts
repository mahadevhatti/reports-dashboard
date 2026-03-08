import { Component } from '@angular/core';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  showModal = false;

  constructor(public reportService: ReportService) {}

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onReportAdded(data: { title: string; subtitle: string }): void {
    this.reportService.addReport(data.title, data.subtitle);
    this.showModal = false;
  }
}
