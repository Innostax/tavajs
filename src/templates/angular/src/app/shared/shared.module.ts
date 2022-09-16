import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<% if(isStore || isCrudWithNode){%>import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';<%}%>
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<% if(isStore){%>import { StoreModule } from '@ngrx/store';
import { reducer, userFeatureKey } from '../utils/store/reducer/user.reducer';<%}%>
<% if(isCrudWithNode){%>import { ApiService } from './services/services';<%}%>

@NgModule({
  declarations: [
    <% if(isStore || isCrudWithNode){%> AddUserModalComponent <%}%>
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    <% if(isStore){%>StoreModule.forFeature(userFeatureKey, reducer),<%}%>
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    <% if(isStore || isCrudWithNode){%>AddUserModalComponent<%}%>
  ],
  <% if(isCrudWithNode){%> providers:[ApiService] <%}%>
})
export class SharedModule { }
