import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizeMessageComponent } from './organize-message.component';

@NgModule({
  declarations: [OrganizeMessageComponent],
  exports: [OrganizeMessageComponent],
  imports: [CommonModule],
})
export class OrganizerMessageModule {}
