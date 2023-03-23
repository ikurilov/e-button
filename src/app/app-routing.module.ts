import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule),
  },
  {
    path: 'old',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
