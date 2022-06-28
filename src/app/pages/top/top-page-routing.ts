import { Route, RouterModule } from '@angular/router';
import { TopPageComponent } from './top-page/top-page.component';

const topRoutes: Route[] = [
  {
    path: '',
    component: TopPageComponent,
  }
];

export const topRouting = RouterModule.forChild(topRoutes);
