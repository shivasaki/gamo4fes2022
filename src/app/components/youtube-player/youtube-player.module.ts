import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player.component';

@NgModule({
  declarations: [YoutubePlayerComponent],
  exports: [YoutubePlayerComponent],
  imports: [CommonModule],
})
export class YoutubePlayerModule {}
