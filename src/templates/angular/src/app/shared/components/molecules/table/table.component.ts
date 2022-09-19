import { Component, OnInit , Input, SimpleChanges , Output, EventEmitter} from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() usersData: any;
  @Input() public handleEditDelete!: (name:any, user:any) => void;
  @Input() shouldShowActions: boolean = false;
  @Input() headers: any;

  data: any;
  constructor() { }

  ngOnInit() : void{}
   public keepOriginalOrder = (a:any, b:any) => a.key;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usersData']?.currentValue) {
      this.data = this.usersData;
    }
  }

  handleUser(name:any, user:any) {
    this.handleEditDelete(name,user);
  }
 
}
