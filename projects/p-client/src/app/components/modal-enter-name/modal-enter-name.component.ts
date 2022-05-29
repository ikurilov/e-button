import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-enter-name',
  templateUrl: './modal-enter-name.component.html',
  styleUrls: ['./modal-enter-name.component.scss']
})
export class ModalEnterNameComponent implements OnInit {

  @Input() name: string;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)])
  })

  constructor(private modalInstance: NgbActiveModal) { }

  ngOnInit(): void {
    this.form.reset({name: this.name || ''})
  }

  public submit(): void {
    this.modalInstance.close(this.form.value.name);
  }
}
