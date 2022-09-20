import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<% if(isCrud || isCrudWithNode){%>import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';<%}%>
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<% if(isStore){%>import { StoreModule } from '@ngrx/store';
import { reducer, userFeatureKey } from '../utils/store/reducer/user.reducer';<%}%>
import { ButtonComponent } from './components/atoms/button/button.component';
import { InputComponent } from './components/atoms/input/input.component';
import { DatepickerComponent } from './components/atoms/datepicker/datepicker.component';
import { LabelComponent } from './components/atoms/label/label.component';
import { TableComponent } from './components/molecules/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<% if(isCrudWithNode){%>import { ApiService } from './services/services';<%}%>

@NgModule({
  declarations: [
    <% if(isCrud || isCrudWithNode){%> AddUserModalComponent, <%}%>
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
    <% if(isCrud || isCrudWithNode){%>AddUserModalComponent,<%}%>
    ButtonComponent, 
    TableComponent, 
    InputComponent, 
    DatepickerComponent,
    LabelComponent
  ],
  <% if(isCrudWithNode){%> providers:[ApiService] <%}%>
})
export class SharedModule { }
