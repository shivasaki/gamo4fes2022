import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { BehaviorSubject, queueScheduler, Subject } from 'rxjs';
import { StageArtist } from '../../core/models/artist';
import { STAGE_ARTISTS } from '../../core/constants/stage-artists.constant';
import { STORAGE_BASE_PATH } from '../../core/constants/firebase-storage.constant';
import { format } from 'date-fns';
import { MODERATORS } from '../../core/constants/moderators.constant';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-artists-tab',
  templateUrl: './artists-tab.component.html',
  styleUrls: ['./artists-tab.component.scss'],
})
export class ArtistsTabComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('artistTabs', { static: false }) artistTabs!: TabsetComponent;

  readonly tabItems: string[] = [
    '2021/02/22',
    '2021/02/23',
    '2021/02/24',
    '2021/02/25',
    '2021/02/26',
    '2021/02/27',
    '2021/02/28',
  ];

  stageArtists$ = new Subject<Required<StageArtist[]>>();
  mcs$ = new Subject<Required<StageArtist>>();
  // 日別のタイムテーブルパス
  timeTableSrc$ = new BehaviorSubject<string | null>(null);
  activeTabIndex = 0;

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.stageArtists$.subscribe((artists) => {
      const date = artists[0].date;
      const [moderator] = MODERATORS.filter((m) => m.date === date);
      this.mcs$.next(moderator);
      this.timeTableSrc$.next(this.getTimeaTableUrl(date?.replace(/\//g, '-') ?? null));
    });
  }

  ngAfterViewInit(): void {
    // NOTE: ExpressionChangedAfterItHasBeenCheckedError対策
    queueScheduler.schedule(() => {
      const initialStageArtists = this.checkStageArtists();
      if (initialStageArtists && this.artistTabs) {
        const index = this.tabItems.findIndex((tab) => tab === initialStageArtists[0].date) ?? 0;
        this.setActiveTab(index);
        return;
      }
      this.stageArtists$.next(this.checkStageArtists() ?? [STAGE_ARTISTS[0]]);
    }, 1);
  }

  ngOnDestroy(): void {
    this.stageArtists$.unsubscribe();
  }

  // タブ選択のイベントハンドラ
  onSelectedTab(tab: TabDirective): void {
    this.stageArtists$.next(STAGE_ARTISTS.filter((stageArtist: StageArtist) => stageArtist.date === tab.id));
    this.activeTabIndex = this.tabItems.findIndex((tabItem) => tabItem === tab.id) ?? 0;
  }

  onChangeTab(index: number): void {
    const tabItem = index >= this.tabItems.length ? this.tabItems[index] : this.tabItems[0];
    this.stageArtists$.next(STAGE_ARTISTS.filter((stageArtist: StageArtist) => stageArtist.date === tabItem));
    this.setActiveTab(index);
    // タイムテーブル上部のコンテンツ量によって、表示位置がずれるためスクロールさせる
    this.scrollTimeTable();
  }

  onOpenTimeTable(): void {
    const timeTablePath = this.getDownloadUrl('images/time_tables/time_table_2021.pdf');
    if (!timeTablePath) {
      return;
    }
    window.open(timeTablePath);
  }

  getThumbUrl(id: number | null): string | null {
    if (id === null) {
      return null;
    }
    return this.getDownloadUrl(`images/artists/${id}.jpg`);
  }

  private getTimeaTableUrl(date: string | null): string | null {
    return !date ? null : this.getDownloadUrl(`images/time_tables/${date}.png`);
  }

  private getDownloadUrl(path: string): string | null {
    if (!path) {
      return null;
    }
    return `${STORAGE_BASE_PATH}/${encodeURIComponent(path)}?alt=media`;
  }

  // tabに一致する日付が存在するか判定し対応する配列を返す
  private checkStageArtists(): StageArtist[] | null {
    const today = format(new Date(), 'yyyy/MM/dd');
    const tab = this.tabItems.filter((date) => date === today);
    return tab?.length ? STAGE_ARTISTS.filter((stageArtist) => stageArtist.date === today) : null;
  }

  private setActiveTab(index: number): void {
    this.artistTabs.tabs[index].active = true;
    this.activeTabIndex = index;
  }

  private scrollTimeTable(): void {
    queueScheduler.schedule(() => {
      this.viewportScroller.scrollToAnchor('time-table');
    }, 50);
  }
}
