import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  @Input() name!: string;
  @Input() for!: string;
  @Input() class!: string;
  constructor() { }

  ngOnInit(): void {}

}
