import { Component } from '@angular/core';
import { RemoteSocketServiceService } from './services/remote-socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Мемная игра';
  constructor(RemoteSocketServiceService: RemoteSocketServiceService) {}
}
