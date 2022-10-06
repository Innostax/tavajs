import { Component, Input, SimpleChanges } from '@angular/core';
import { KeyValue } from '@angular/common';

declare let $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() usersData: any;
  @Input() public handleEditDeleteAction!: (name: string, user: object) => void;
  @Input() shouldShowActions: boolean = false;
  @Input() headers: any;

  data: any;
  public keepOriginalOrder = (a: KeyValue<number, string>) => a.key;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usersData']?.currentValue) {
      this.data = this.usersData;
    }
  }

  handleUser(name: string, user: object) {
    this.handleEditDeleteAction(name, user);
  }

}
