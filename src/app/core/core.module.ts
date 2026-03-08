import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  providers: [AuthGuard, LocalStorageService],
})
export class CoreModule {}
