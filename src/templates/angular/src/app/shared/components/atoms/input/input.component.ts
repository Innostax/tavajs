import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() id!: string;
  @Input() value: string | undefined = '';
  @Input() name!: string;
  @Input() type!: string;
  @Input() class!: any;
  @Input() placeholder!: string
  @Input() registerForm!: FormGroup
  @Input() formControlName!: string
  @Output() OnChange = new EventEmitter();

  handleOnChange(event:any){
    this.OnChange.emit(event);
  }

}
