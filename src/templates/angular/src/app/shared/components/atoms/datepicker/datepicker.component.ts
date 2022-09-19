import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  model!: NgbDateStruct;
  constructor() { }

  ngOnInit(): void {
  }
  
}
