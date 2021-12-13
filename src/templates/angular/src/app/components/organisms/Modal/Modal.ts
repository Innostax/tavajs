import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './Modal.html',
  styleUrls: ['./Modal.css']
})
export class ModalComponent implements OnInit {
  @Input() title:any;

  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
  }
  // closeModal(message: string) {
  //   this.activeModal.close();
  // }
}
