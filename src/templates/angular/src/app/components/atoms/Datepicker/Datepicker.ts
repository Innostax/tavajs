import { Component } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './Datepicker.html',
  styleUrls: ['./Datepicker.css']
})
export class DatepickerComponent {
  public date = new Date(Date.now());
}
