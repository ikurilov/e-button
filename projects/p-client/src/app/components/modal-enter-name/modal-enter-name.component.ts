import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CLIENT_NAME_KEY } from '../../services/p-client-utils.service';
import { Store } from '@ngrx/store';
import { pClientActions } from '../../state/p-client.actions';

@Component({
  selector: 'app-modal-enter-name',
  templateUrl: './modal-enter-name.component.html',
  styleUrls: ['./modal-enter-name.component.scss'],
})
export class ModalEnterNameComponent implements OnInit {
  @Input() name: string;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
    ]),
  });

  constructor(private modalInstance: NgbActiveModal, private store: Store) {}

  ngOnInit(): void {
    this.form.reset({ name: this.name || '' });
  }

  public submit(): void {
    let name = this.form.value.name;
    localStorage.setItem(CLIENT_NAME_KEY, name);
    this.store.dispatch(pClientActions.changeName({ name }));
    this.modalInstance.close(name);
  }
}
