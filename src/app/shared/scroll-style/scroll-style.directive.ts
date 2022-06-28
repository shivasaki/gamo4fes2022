import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollStyle]',
})
export class ScrollStyleDirective implements OnInit, OnDestroy, AfterViewInit {
  private componentPosition!: number;

  constructor(el: ElementRef, private renderer: Renderer2, private zone: NgZone) {
    this.targetEl = el.nativeElement as HTMLElement;
  }

  // 発火時に付与するのクラス名
  @Input() addClassName = 'is-active';
  // 発火タイミングのオフセット (px)
  @Input() offsetHeight = 0;
  // 発火後にスクロールバックした場合、クラスを除去するかどうか
  @Input() isResetClass = true;
  @Input() listenerTarget: 'window' | 'body' = 'window';

  targetEl: HTMLElement;

  private removeListener = () => {};

  ngOnInit(): void {
    // change detection回避のため
    this.zone.runOutsideAngular(() => {
      this.removeListener = this.renderer.listen(this.listenerTarget, 'scroll', () => {
        if (!this.componentPosition) {
          return;
        }
        const scrollPosition = this.getScrollY(window);
        const windowHeight = window.innerHeight;
        if (scrollPosition + windowHeight >= this.componentPosition + this.offsetHeight) {
          this.renderer.addClass(this.targetEl, this.addClassName);
        } else if (
          this.isResetClass &&
          scrollPosition + windowHeight < this.componentPosition + this.offsetHeight + 20
        ) {
          this.renderer.removeClass(this.targetEl, this.addClassName);
        }
      });
    });
  }

  private getScrollY(window: Window & typeof globalThis): number {
    if (this.listenerTarget === 'window') {
      if ('scrollY' in window) {
        return window.scrollY;
      }
      if ('pageYOffset' in window) {
        return window.pageYOffset;
      }
      const d = window.document;
      return d.documentElement.scrollTop || d.body.scrollTop;
    }
    const doc = window.document;
    return doc.documentElement.scrollTop || doc.body.scrollTop;
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.componentPosition = this.targetEl.getBoundingClientRect().top));
  }

  ngOnDestroy(): void {
    this.removeListener();
  }
}
