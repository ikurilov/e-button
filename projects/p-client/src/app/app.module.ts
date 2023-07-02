import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ModalEnterNameComponent } from './components/modal-enter-name/modal-enter-name.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalChangeTeamComponent } from './components/modal-change-team/modal-change-team.component';
import { BubblesComponent } from './components/bubles/bubbles.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { ActionsAndInfoComponent } from './components/actions-and-info/actions-and-info.component';
import { Store, StoreModule } from '@ngrx/store';
import { pClientEffects } from './state/p-client.effects';
import { pClientReducer } from './state/p-client.reducer';
import { ModalOptionMenuComponent } from './components/modal-option-menu/modal-option-menu.component';
import { ModalIconSelectComponent } from './components/modal-icon-select/modal-icon-select.component';

const config: SocketIoConfig = { url: window.location.origin, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ModalEnterNameComponent,
    ModalChangeTeamComponent,
    BubblesComponent,
    MyTeamComponent,
    ActionsAndInfoComponent,
    ModalOptionMenuComponent,
    ModalIconSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    StoreModule.forRoot({
      pClient: pClientReducer,
    }),
    EffectsModule.forRoot([pClientEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
