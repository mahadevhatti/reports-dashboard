import { Injectable } from '@angular/core';
import { Report } from '../../models/report.model';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { generateReports, createReportFromInput } from './mock-data.factory';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = environment.storageKey;
const PAGE_SIZE = environment.pageSize;

@Injectable()
export class ReportService {
  allReports: Report[] = [];
  filteredReports: Report[] = [];
  paginatedReports: Report[] = [];
  selectedReport: Report | null = null;
  currentPage = 1;
  totalPages = 1;
  totalEntries = 0;
  loading = true;

  private searchTerm = '';

  constructor(private storageService: LocalStorageService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.loading = true;

    setTimeout(() => {
      const stored = this.storageService.get(STORAGE_KEY);
      this.allReports = stored && stored.length > 0
        ? stored
        : generateReports(environment.defaultReportCount);

      if (!stored || stored.length === 0) {
        this.storageService.set(STORAGE_KEY, this.allReports);
      }

      this.selectedReport = this.allReports[0] ?? null;
      this.applyFilter();
      this.loading = false;
    }, environment.loadDelayMs);
  }

  selectReport(id: string): void {
    this.selectedReport = this.allReports.find((r) => r.id === id) ?? null;
  }

  search(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.applyFilter();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }

  addReport(title: string, subtitle: string): void {
    const newReport = createReportFromInput(title, subtitle);
    this.allReports = [newReport, ...this.allReports];
    this.storageService.set(STORAGE_KEY, this.allReports);
    this.selectedReport = newReport;
    this.currentPage = 1;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredReports = this.allReports;
    } else {
      const keyword = this.searchTerm.toLowerCase();
      this.filteredReports = this.allReports.filter((r) =>
        r.title.toLowerCase().includes(keyword)
      );
    }
    this.totalEntries = this.filteredReports.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalEntries / PAGE_SIZE));
    this.applyPagination();
  }

  private applyPagination(): void {
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    const start = (this.currentPage - 1) * PAGE_SIZE;
    this.paginatedReports = this.filteredReports.slice(start, start + PAGE_SIZE);
  }
}
