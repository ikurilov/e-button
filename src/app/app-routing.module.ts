import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { EmptyGameGuard } from './guards/empty-game.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'game',
    canLoad: [EmptyGameGuard],
    loadChildren: () =>
      import('./modules/game-play/game-play.module').then(
        (m) => m.GamePlayModule,
      ),
  },
  {
    path: 'old',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
