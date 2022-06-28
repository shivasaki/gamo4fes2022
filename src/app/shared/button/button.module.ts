import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
  ],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonModule {
}
