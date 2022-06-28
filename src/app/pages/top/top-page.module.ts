import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page/top-page.component';
import { topRouting } from './top-page-routing';
import { ButtonModule } from '../../shared/button/button.module';
import { ScrollStyleModule } from '../../shared/scroll-style/scroll-style.module';
import { FooterModule } from '../../shared/footer/footer.module';
import { MatRippleModule } from '@angular/material/core';
import { ScrollTopButtonModule } from '../../shared/scroll-top-button/scroll-top-button.module';
import { ArtistsTabModule } from '../../components/artists-tab/artists-tab.module';
import { YoutubePlayerModule } from '../../components/youtube-player/youtube-player.module';
import { ArchiveCarouselModule } from '../../components/archive-carousel/archive-carousel.module';
import { SupporterInfoModule } from '../../components/supporter-info/supporter-info.module';
import { ArchiveListModule } from '../../components/archive-list/archive-list.module';
import { OrganizerMessageModule } from '../../components/organizer-message/organizer-message.module';

@NgModule({
  imports: [
    CommonModule,
    topRouting,
    ButtonModule,
    ScrollStyleModule,
    FooterModule,
    MatRippleModule,
    ScrollTopButtonModule,
    ArtistsTabModule,
    YoutubePlayerModule,
    ArchiveCarouselModule,
    SupporterInfoModule,
    ArchiveListModule,
    OrganizerMessageModule,
  ],
  declarations: [TopPageComponent],
})
export class TopPageModule {}
