import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { Teams } from '../../../../../../models/shared-models';

@Component({
  selector: 'app-modal-edit-score',
  templateUrl: './modal-edit-score.component.html',
  styleUrls: ['./modal-edit-score.component.scss']
})
export class ModalEditScoreComponent implements OnInit {
  @Input() team: Teams;
  @Input() points: number;
  scoreControl: FormControl = new FormControl(0, Validators.required);

  constructor(public modalInstance: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.scoreControl.setValue(this.points);
  }

  submit() {
    this.modalInstance.close({ points: this.scoreControl.value });
  }

  close() {
    this.modalInstance.dismiss();
  }


}
