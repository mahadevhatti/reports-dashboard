import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalEntries: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  readonly pageSize = environment.pageSize;
  pages: number[] = [1];
  startEntry: number = 1;
  endEntry: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    this.startEntry = (this.currentPage - 1) * this.pageSize + 1;
    this.endEntry = Math.min(this.currentPage * this.pageSize, this.totalEntries);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  prev(): void {
    this.goToPage(this.currentPage - 1);
  }

  next(): void {
    this.goToPage(this.currentPage + 1);
  }
}
