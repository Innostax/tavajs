import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<% if(isStore){%>import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';<%}%>
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<% if(isStore){%>import { StoreModule } from '@ngrx/store';
import { reducer, userFeatureKey } from '../utils/store/reducer/user.reducer';<%}%>

@NgModule({
  declarations: [
    <% if(isStore){%> AddUserModalComponent <%}%>
  ],
  imports: [
    CommonModule,
    FormsModule,
    <% if(isStore){%>ReactiveFormsModule,
    StoreModule.forFeature(userFeatureKey, reducer),<%}%>
  ],
  exports: [ <% if(isStore){%>AddUserModalComponent<%}%>
  ]
})
export class SharedModule { }