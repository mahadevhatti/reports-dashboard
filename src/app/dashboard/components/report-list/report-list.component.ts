import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '../../../models/report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
})
export class ReportListComponent {
  @Input() reports: Report[] = [];
  @Input() selectedId: string = '';
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalEntries: number = 0;

  @Output() selectReport = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() addClick = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  onSelect(id: string): void {
    this.selectReport.emit(id);
  }

  trackByReportId(_index: number, report: Report): string {
    return report.id;
  }
}
