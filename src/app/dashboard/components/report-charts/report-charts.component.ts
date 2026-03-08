import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Report } from '../../../models/report.model';

@Component({
  selector: 'app-report-charts',
  templateUrl: './report-charts.component.html',
})
export class ReportChartsComponent implements OnChanges {
  @Input() report!: Report;

  barChartData!: ChartConfiguration<'bar'>['data'];
  barChartOptions!: ChartConfiguration<'bar'>['options'];

  doughnutChartData!: ChartConfiguration<'doughnut'>['data'];
  doughnutChartOptions!: ChartConfiguration<'doughnut'>['options'];
  doughnutPlugins = [ChartDataLabels];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['report'] && this.report) {
      this.buildBarChart();
      this.buildDoughnutChart();
    }
  }

  private buildBarChart(): void {
    this.barChartData = {
      labels: this.report.labels,
      datasets: [
        {
          label: 'In Process',
          data: this.report.inProcess,
          backgroundColor: '#c4b5fd',
          hoverBackgroundColor: '#a78bfa',
          stack: 'stack1',
          borderRadius: 4,
          barPercentage: 0.55,
          categoryPercentage: 0.6,
        },
        {
          label: 'Unacknowledged',
          data: this.report.unacknowledged,
          backgroundColor: '#a78bfa',
          hoverBackgroundColor: '#8b5cf6',
          stack: 'stack1',
          borderRadius: 4,
          barPercentage: 0.55,
          categoryPercentage: 0.6,
        },
        {
          label: 'On Watch',
          data: this.report.onWatch,
          backgroundColor: '#6366f1',
          hoverBackgroundColor: '#4f46e5',
          stack: 'stack1',
          borderRadius: 4,
          barPercentage: 0.55,
          categoryPercentage: 0.6,
        },
      ],
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 750, easing: 'easeInOutQuart' },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 15,
            font: { size: 11, family: 'Inter, Arial, sans-serif' },
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 10,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 11 },
        },
        datalabels: { display: false },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { font: { size: 11 } },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: { color: '#f3f4f6' },
          ticks: { font: { size: 11 } },
        },
      },
    };
  }

  private buildDoughnutChart(): void {
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const openAlerts = this.report.metrics.openAlerts || 0;
    const inProcess = sum(this.report.inProcess);
    const acknowledged = sum(this.report.acknowledged);
    const onWatch = sum(this.report.onWatch);
    const total = openAlerts + inProcess + acknowledged + onWatch;

    this.doughnutChartData = {
      labels: ['Open', 'In Process', 'Acknowledged', 'On Watch'],
      datasets: [
        {
          data: [openAlerts, inProcess, acknowledged, onWatch],
          backgroundColor: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'],
          hoverBackgroundColor: ['#4f46e5', '#7c3aed', '#8b5cf6', '#a78bfa'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverBorderWidth: 3,
        },
      ],
    };

    this.doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 750, easing: 'easeInOutQuart' },
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            padding: 12,
            font: { size: 11, family: 'Inter, Arial, sans-serif' },
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 10,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 11 },
        },
        datalabels: {
          color: '#fff',
          font: { size: 12, weight: 'bold' },
          formatter: (value: number) => {
            const percent = ((value / total) * 100).toFixed(0);
            return `${percent}%`;
          },
          anchor: 'center',
          align: 'center',
        },
      },
      cutout: '55%',
    };
  }
}
