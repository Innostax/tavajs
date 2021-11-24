import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() name: string;
  @Input() class: string;
  @Output() onClick = new EventEmitter<String>();
  constructor() { }
  ngOnInit(): void {
  };
  emitEvent() {
    this.onClick.emit();
  };
};
