import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupporterInfoComponent } from './supporter-info.component';

@NgModule({
  declarations: [SupporterInfoComponent],
  exports: [SupporterInfoComponent],
  imports: [CommonModule],
})
export class SupporterInfoModule {}
