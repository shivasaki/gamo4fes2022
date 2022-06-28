import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollStyleDirective } from './scroll-style.directive';


@NgModule({
  declarations: [ScrollStyleDirective],
  imports: [
    CommonModule
  ],
  exports: [ScrollStyleDirective]
})
export class ScrollStyleModule {
}
