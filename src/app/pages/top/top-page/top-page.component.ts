import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { LIVE_ARCHIVES } from '../../../core/constants/live-archives.constant';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, from } from 'rxjs';
import * as imageLoaded from 'imagesloaded';
import { LoadingService } from '../../../core/services/loading.service';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss'],
})
export class TopPageComponent implements OnInit {
  isLoaded = false;
  windowHeight!: number;
  archives = LIVE_ARCHIVES;
  // TOP Image
  townImage$ = from(this.storage.storage.ref().child('images/top/town.png').getDownloadURL()).pipe(filter((v) => !!v));
  gyammosyImage$ = from(this.storage.storage.ref().child('images/top/gyammossy.png').getDownloadURL()).pipe(
    filter((v) => !!v)
  );

  constructor(
    private storage: AngularFireStorage,
    private renderer: Renderer2,
    private el: ElementRef,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    combineLatest([this.townImage$.pipe(first()), this.gyammosyImage$.pipe(first())])
      .pipe(first())
      .subscribe(() => this.checkImageLoaded());
  }

  checkImageLoaded(): void {
    const els = this.el.nativeElement.querySelectorAll('.bg-image');
    if (!els) {
      this.loadingService.isLoaded.next(true);
      this.isLoaded = true;
      return;
    }
    // 画像の読み込みを監視
    imageLoaded(els, { background: true }).on('done', () => {
      this.loadingService.isLoaded.next(true);
      this.isLoaded = true;
      setTimeout(() => {
        const topPageEl = this.el.nativeElement.querySelector('.top-page-content');
        this.renderer.addClass(topPageEl, 'moving');
      }, 3000);
    });
  }
}
