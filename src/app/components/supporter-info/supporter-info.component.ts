import { Component, OnInit } from '@angular/core';
import { SUPPORTERS } from '../../core/constants/supporters.constant';
import { Supporter } from '../../core/models/supporter';
import { STORAGE_BASE_PATH } from '../../core/constants/firebase-storage.constant';

@Component({
  selector: 'app-supporter-info',
  templateUrl: './supporter-info.component.html',
  styleUrls: ['./supporter-info.component.scss'],
})
export class SupporterInfoComponent implements OnInit {
  supporters: Supporter[] = SUPPORTERS;

  constructor() {}

  ngOnInit(): void {}

  getThumbUrl(id: number | null): string | null {
    if (id === null) {
      return null;
    }
    return this.getDownloadUrl(`images/supporters/${id}.jpg`);
  }

  private getDownloadUrl(path: string): string | null {
    if (!path) {
      return null;
    }
    return `${STORAGE_BASE_PATH}/${encodeURIComponent(path)}?alt=media`;
  }
}
