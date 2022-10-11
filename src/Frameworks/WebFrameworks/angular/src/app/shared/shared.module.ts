import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<% if(isStore || dbName){%>import { UserActionsModalComponent } from './components/user-actions-modal/user-actions-modal.component';<%}%>
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<% if(isStore){%>import { StoreModule } from '@ngrx/store';
import { reducer, userFeatureKey } from '../utils/store/reducer/user.reducer';<%}%>
import { ButtonComponent } from './components/atoms/button/button.component';
import { InputComponent } from './components/atoms/input/input.component';
import { DatepickerComponent } from './components/atoms/datepicker/datepicker.component';
import { LabelComponent } from './components/atoms/label/label.component';
import { TableComponent } from './components/molecules/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<% if(dbName){%>import { ApiService } from './services/services';<%}%>
<% if(isMaterialUI){%>import { MaterialModule } from './custom-materialui.module';<%}%>

@NgModule({
  declarations: [
    <% if(isStore || dbName){%> UserActionsModalComponent, <%}%>
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
    NgbModule,
    <% if(isMaterialUI){%>MaterialModule<%}%>
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    <% if(isStore || dbName){%>UserActionsModalComponent,<%}%>
    ButtonComponent, 
    TableComponent, 
    InputComponent, 
    DatepickerComponent,
    LabelComponent,
    <% if(isMaterialUI){%>MaterialModule,<%}%>
  ],
  <% if(dbName){%> providers:[ApiService] <%}%>
})
export class SharedModule { }
