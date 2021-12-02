import { Component, OnInit,Input } from '@angular/core';
import { User } from 'src/app/modules/Users/User';

@Component({
  selector: 'app-table',
  templateUrl: './Table.html',
  styleUrls: ['./Table.css']
})
export class TableComponent implements OnInit {
@Input() data:User[] | any[];
@Input() cols:any[];
@Input() keys:any[];
  constructor() { }

  ngOnInit(): void {
    console.log('Data',this.data)
  }

}
