import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() type: string;
  @Input() class:string;
  @Input() placeholder: string;
  constructor() { }
  ngOnInit(): void {
  };
};
