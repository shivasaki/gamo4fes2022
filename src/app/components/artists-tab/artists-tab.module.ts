import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsTabComponent } from './artists-tab.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonModule } from '../../shared/button/button.module';


@NgModule({
  declarations: [ArtistsTabComponent],
  exports: [ArtistsTabComponent],
  imports: [CommonModule, TabsModule, ButtonModule],
})
export class ArtistsTabModule {}
