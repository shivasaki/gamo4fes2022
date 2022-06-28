import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveListComponent } from './archive-list.component';

@NgModule({
  declarations: [ArchiveListComponent],
  imports: [CommonModule],
  exports: [ArchiveListComponent],
})
export class ArchiveListModule {}
