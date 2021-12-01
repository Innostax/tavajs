import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './Button.html',
  styleUrls: ['./Button.css']
})
export class ButtonComponent implements OnInit {
  @Input() name: string;
  @Input() class: string;
  @Output() onClick = new EventEmitter<String>();
  constructor() { }
  ngOnInit(): void {
  };
  handleOnClick() {
    this.onClick.emit();
  };
};
