import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveCarouselComponent } from './archive-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [ArchiveCarouselComponent],
  exports: [ArchiveCarouselComponent],
  imports: [CommonModule, CarouselModule],
})
export class ArchiveCarouselModule {}
