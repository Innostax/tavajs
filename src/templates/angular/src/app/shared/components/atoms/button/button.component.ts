import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() name!: string;
  @Input() class!: string;
  @Input() type! : string;
  @Output() onClick = new EventEmitter<string>();

  constructor() {};

  ngOnInit(): void {};

  handleOnClick(){
    this.onClick.emit();
  }
}
