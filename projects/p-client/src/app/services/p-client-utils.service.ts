import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnterNameComponent } from '../components/modal-enter-name/modal-enter-name.component';

const CLIENT_ID_KEY = '_uid';
const CLIENT_NAME_KEY = '_name';
const CLIENT_ICON_KEY = '_name';
@Injectable({
  providedIn: 'root',
})
export class PClientUtilsService {
  constructor(private modal: NgbModal) {}

  public async initSequence(): Promise<{
    name: string;
    id: string;
    icon?: string;
  }> {
    let id = localStorage.getItem(CLIENT_ID_KEY);
    let name = localStorage.getItem(CLIENT_NAME_KEY);
    let icon = localStorage.getItem(CLIENT_ICON_KEY);

    if (!name) {
      const mdl = this.modal.open(ModalEnterNameComponent, {
        backdrop: 'static',
        centered: true,
      });
      name = await mdl.result;
      localStorage.setItem(CLIENT_NAME_KEY, name);
    }

    if (!id) {
      id = name + new Date() + Math.random();
      localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return { name, id, icon };
  }
}
