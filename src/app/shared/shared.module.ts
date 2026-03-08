import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [SearchBarComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [SearchBarComponent, PaginationComponent],
})
export class SharedModule {}
