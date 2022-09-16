import { Component, OnInit } from '@angular/core';
<% if(isStore){%>import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { deleteUser } from 'src/app/utils/store/action/user.actions';
import { userState } from 'src/app/utils/store/reducer/user.reducer';
import { selectusers } from 'src/app/utils/store/selector/user.selectors';
import { User } from 'src/app/utils/store/User';<%}%>
<% if(isCrudWithNode){%>import {ApiService} from 'src/app/shared/services/services'<%}%>

declare let $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data: any = {};
  <% if(isCrudWithNode){%> users: any;<%}%>
  <% if(isStore){%>
  users$: Observable<User[]>;<%}%>
  constructor(<% if(isStore){%> private store: Store<userState>, private modalService: NgbModal, <%}%> <% if(isCrudWithNode){%> private apiService: ApiService <%}%>) {
    <% if(isStore){%> this.users$ = this.store.pipe(select(selectusers)); <%}%>
  }

  ngOnInit(): void {
    <% if(isCrudWithNode){%>this.getUsers(); <%}%>
  }

  <% if(isCrudWithNode){%>
  getUsers() {
    this.apiService.getEmployees().subscribe((res: any) => 
      this.users = res
    )
  }
  <%}%>
  
  onClickAddUser() {
    $('#addUser_modal').modal('show');
    this.data = {};
  }

  editUser(data: any) {
    $('#addUser_modal').modal('show');
     this.data= data;
  }

  deleteUser(data: any) {
    <% if(isStore){%>this.store.dispatch(deleteUser({ id: data }));<%}%>
    <% if(isCrudWithNode){%>
      this.apiService.deleteEmployee(data).subscribe();
      this.getUsers();
    <%}%>
  }

  closeModal() {
    $('#addUser_modal').modal('hide');
    this.data = {};
    <% if(isCrudWithNode){%>this.getUsers();<%}%>
  }
}
