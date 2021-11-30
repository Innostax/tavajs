import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './Input.html',
  styleUrls: ['./Input.css']
})
export class InputComponent implements OnInit {
  @Input() value: string | undefined ='';
  @Input() type:string;
  @Input() class:any;
  @Input() placeholder:any
  @Output() changevalue = new EventEmitter();
  ngOnInit(){}
  emit(event:any){
    this.changevalue.emit(event);
  };
};
