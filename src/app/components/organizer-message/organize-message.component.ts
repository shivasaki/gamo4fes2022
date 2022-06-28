import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { STORAGE_BASE_PATH } from '../../core/constants/firebase-storage.constant';
import { ORGANIZER } from '../../core/constants/organizer.constant';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-organize-message',
  templateUrl: './organize-message.component.html',
  styleUrls: ['./organize-message.component.scss'],
})
export class OrganizeMessageComponent implements OnInit {
  readonly organizer = ORGANIZER;
  @ViewChild('messageModal', { static: true }) modalTemplate!: TemplateRef<any>;

  modalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  get organizerThumbUrl(): string {
    return this.getDownloadUrl(`images/artists/${this.organizer.artistId}.jpg`);
  }

  get messageTopImageUrl(): string {
    return this.getDownloadUrl(`images/top/message.jpg`);
  }

  private getDownloadUrl(path: string): string {
    return `${STORAGE_BASE_PATH}/${encodeURIComponent(path)}?alt=media`;
  }

  openMessageModal(): void {
    this.modalRef = this.modalService.show(this.modalTemplate, { class: 'modal-md' });
  }

  onModalClose(): void {
    this.modalRef?.hide();
  }
}
