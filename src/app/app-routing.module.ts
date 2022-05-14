import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
