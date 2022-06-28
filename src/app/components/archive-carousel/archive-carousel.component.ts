import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LIVE_ARCHIVES } from '../../core/constants/live-archives.constant';
import { Archive } from '../../core/models/archive';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-archive-carousel',
  templateUrl: './archive-carousel.component.html',
  styleUrls: ['./archive-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveCarouselComponent {
  itemsPerSlide = 4;
  singleSlideOffset = true;

  readonly archives: Archive[] = LIVE_ARCHIVES;
  safeUrls: SafeResourceUrl[];

  constructor(sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: Document) {
    this.safeUrls = LIVE_ARCHIVES.map((archive) => sanitizer.bypassSecurityTrustResourceUrl(archive.srcUrl));
    const width = document.body.clientWidth;
    if (width < 800) {
      this.itemsPerSlide = 2;
    } else if (width < 1000) {
      this.itemsPerSlide = 3;
    }
  }

  onOpenLink(item: Archive): void {
    window.open(item.linkUrl.toString());
  }
}
