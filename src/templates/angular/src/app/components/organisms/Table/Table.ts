import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/modules/Users/User';

@Component({
  selector: 'app-table',
  templateUrl: './Table.html',
  styleUrls: ['./Table.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() cols: any[];
  @Input() keys: any[];
  @Output() OnDeleteClick = new EventEmitter<String>();
  @Output() OnEditClick = new EventEmitter<String>();
  constructor() { }
  ngOnInit(): void {
    console.log('Data', this.data)
  }
  handleOnDeleteClick(id: string) {
    this.OnDeleteClick.emit(id);
  };
  handleOnEditClick(user: any) {
    console.log('Edit', user)
    this.OnEditClick.emit(user);
  };
}
