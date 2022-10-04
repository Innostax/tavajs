import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() name!: string;
  @Input() class!: string;
  @Input() type! : string;
  @Input() disabledBtn: boolean = false;
  @Output() onClick = new EventEmitter<string>();

  handleOnClick(){
    this.onClick.emit();
  }
}
