import { Component } from '@angular/core';
import { Archive } from '../../core/models/archive';
import { LIVE_ARCHIVES } from '../../core/constants/live-archives.constant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss'],
})
export class ArchiveListComponent {
  readonly archives: Archive[] = LIVE_ARCHIVES;

  safeUrls: SafeResourceUrl[];

  constructor(sanitizer: DomSanitizer) {
    this.safeUrls = LIVE_ARCHIVES.map((archive) => sanitizer.bypassSecurityTrustResourceUrl(archive.srcUrl + '?rel=0'));
  }
}
