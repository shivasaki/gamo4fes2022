import { Component } from '@angular/core';
import { format } from 'date-fns';
import { STAGE_ARTISTS } from '../../core/constants/stage-artists.constant';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
})
export class YoutubePlayerComponent {
  // ライブ配信チャンネル数(表示日)
  liveChannelCount = 1;

  constructor() {
    const today = format(new Date(), 'yyyy/MM/dd');
    const stageArtists = STAGE_ARTISTS.filter((stageArtist) => stageArtist.date === today) ?? [];
    if (stageArtists?.length > 1) {
      this.liveChannelCount = 2;
    }
  }
}
