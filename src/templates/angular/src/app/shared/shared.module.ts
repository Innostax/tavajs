import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<% if(isStore){%>import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';<%}%>
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<% if(isStore){%>import { StoreModule } from '@ngrx/store';
import { reducer, userFeatureKey } from '../utils/store/reducer/user.reducer';<%}%>
import { ButtonComponent } from './components/atoms/button/button.component';
import { InputComponent } from './components/atoms/input/input.component';
import { DatepickerComponent } from './components/atoms/datepicker/datepicker.component';
import { LabelComponent } from './components/atoms/label/label.component';
import { TableComponent } from './components/molecules/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    <% if(isStore){%> AddUserModalComponent, <%}%>
    ButtonComponent,
    InputComponent,
    DatepickerComponent,
    LabelComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    <% if(isStore){%>StoreModule.forFeature(userFeatureKey, reducer),<%}%>
    NgbModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    <% if(isStore){%>AddUserModalComponent,<%}%>
    ButtonComponent, 
    TableComponent, 
    InputComponent, 
    DatepickerComponent,
    LabelComponent
  ]
})
export class SharedModule { }
