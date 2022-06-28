import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';
import { animate, AnimationEvent, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('addModal', [
      state('true', style({ background: 'linear-gradient(40deg, #00A73D, #00B383)', width: '150%', height: '150%' })),
      state('false', style({ background: 'transparent', width: '*', height: '*' })),
      transition('false <=> true', animate('900ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
    trigger('navList', [
      transition('default => show', [
        query('.nav-list-menu', [
          style({ opacity: 0, transform: 'translateX(200px)' }),
          stagger(100, [
            animate('400ms 50ms cubic-bezier(0.6, 0.15, 0.3, 0.8)', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  navigation: Route[] = [];
  navAnimationState = 'default';

  @Input() isActiveHamburger = false;
  @Output() isActiveHamburgerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private renderer: Renderer2, private viewPortScroller: ViewportScroller) {}

  onChangeHamburgerState(): void {
    this.isActiveHamburger = !this.isActiveHamburger;
    this.isActiveHamburgerChange.emit(this.isActiveHamburger);
    const body = document.body;
    if (this.isActiveHamburger) {
      this.renderer.addClass(body, 'modal-open');
      return;
    }
    this.renderer.removeClass(body, 'modal-open');
  }

  onMoveTopPage(): void {
    window.location.replace(window.location.origin);
  }

  onAnimationDone(e: AnimationEvent): void {
    // 初回のみ 'defaultへ' ngForのレンダリング後にアニメーションさせるため
    if (e.fromState === 'void' && e.toState === 'default') {
      this.navAnimationState = 'show';
      return;
    }
    if (e.toState === 'show') {
      this.navAnimationState = 'default';
      return;
    }
  }

  onScrollToFragment(fragment: string): void {
    this.viewPortScroller.scrollToAnchor(fragment);
    if (this.isActiveHamburger) {
      this.isActiveHamburger = !this.isActiveHamburger;
      this.isActiveHamburgerChange.emit(this.isActiveHamburger);
    }
  }
}
