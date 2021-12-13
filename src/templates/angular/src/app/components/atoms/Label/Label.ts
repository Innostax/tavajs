import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './Label.html',
  styleUrls: ['./Label.css']
})
export class LabelComponent implements OnInit {
  @Input() name: string;
  constructor() {}
  ngOnInit(): void {
  }
}
