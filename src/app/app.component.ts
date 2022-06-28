import { Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { LoadingService } from './core/services/loading.service';
import { queueScheduler, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

declare var luxy: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('splash', [
      transition('show => change', [
        query('.splash', [
          style({ opacity: 1, transform: 'translateX(calc(-100vw - 200px))' }),
          stagger(-100, [
            animate(
              '900ms cubic-bezier(0.645, 0.045, 0.355, 1)',
              style({ opacity: 1, transform: 'translateX(calc(100vw + 200px))' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  state = '';
  splashState = '';
  subscription = new Subscription();

  // タッチデバイス判定
  get isTouchDevice(): boolean {
    return window.ontouchstart === null;
  }

  constructor(
    private loadingService: LoadingService,
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.loadingService.isLoaded.subscribe((v) => this.onLoad(v)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDoneSplash(event: any): void {
    this.splashState = 'show';
  }

  onActivate(): void {
    window.scrollTo(0, 0);
    if (this.isTouchDevice) {
      this.document.body.scrollTop = 0;
    }
    // 初回は処理しない
    if (!!this.state) {
      this.setState('change');
      this.splashState = 'change';
      return;
    }
    this.splashState = 'show';
  }

  private onLoad(isLoaded: boolean): void {
    if (!isLoaded) {
      this.setState('');
      return;
    }
    this.setState('show');
    if (!this.isTouchDevice) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          luxy.init({
            wrapper: '#parallax',
            targets: '.parallax-el',
            wrapperSpeed: 0.09,
          });
        });
      });
    }
  }

  private setState(state: string): void {
    queueScheduler.schedule(() => {
      this.state = state;
    });
  }
}
