import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { MetricsCardsComponent } from './components/metrics-cards/metrics-cards.component';
import { ReportChartsComponent } from './components/report-charts/report-charts.component';
import { AddReportModalComponent } from './components/add-report-modal/add-report-modal.component';

import { ReportService } from './services/report.service';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ReportListComponent,
    MetricsCardsComponent,
    ReportChartsComponent,
    AddReportModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    BaseChartDirective,
  ],
  providers: [
    ReportService,
    provideCharts(withDefaultRegisterables()),
  ],
})
export class DashboardModule {}
