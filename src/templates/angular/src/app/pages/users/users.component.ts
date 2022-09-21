import { Component, OnInit } from '@angular/core';
<% if(isStore){%>import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { deleteUser } from 'src/app/utils/store/action/user.actions';
import { userState } from 'src/app/utils/store/reducer/user.reducer';
import { selectusers } from 'src/app/utils/store/selector/user.selectors';
import { User } from 'src/app/utils/store/User';<%}%>
<% if(isCrudWithNode){%>import {ApiService} from 'src/app/shared/services/services'<%}%>
<% if(isCrud || isCrudWithNode){%>
declare let $: any;
const EDIT = 'edit'
<%}%>
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  <% if(isCrud || isCrudWithNode){%>
  headers = ['name', 'username', 'email', 'actions'];
  shouldShowActions: boolean = true;
  data: any = {};
  deleteUserInfo: boolean = false;
  <%}%>
  <% if(isCrudWithNode){%> users: any;<%}%>
  <% if(isStore){%>
  users$: Observable<User[]>;
  <%}%>
  constructor(<% if(isStore){%> private store: Store<userState>, private modalService: NgbModal, <%}%> <% if(isCrudWithNode){%> private apiService: ApiService <%}%>) {
    <% if(isStore){%> this.users$ = this.store.pipe(select(selectusers)); <%}%>
  }

  ngOnInit(): void {
    <% if(isCrudWithNode){%>this.getUsers(); <%}%>
  }

  <% if(isCrudWithNode){%>
  getUsers() {
    this.apiService.getEmployees().subscribe((res: any) => 
      this.users = res.map((each: any)=> {
        const refactoredUserData: object = {
          id: each.id,
          name: each.name,
          username: each.username,
          email: each.email,
        }
        return refactoredUserData
        }
      )
    )
  }
  <%}%>
  
  <% if(isCrud || isCrudWithNode){%>
  onClickAddUser() {
    $('#addUser_modal').modal('show');
    this.data = {};
    this.deleteUserInfo = false;
  }

  public handleUserActions = (name: any, user: any) => {
    if(name == EDIT) this.editUser(user)
    else this.deleteUser(user)
  }

  editUser(data: any) {
    $('#addUser_modal').modal('show');
    this.data = data;
    this.deleteUserInfo = false;
  }

  deleteUser(data: any) {
    $('#addUser_modal').modal('show');
    this.data = data;
    this.deleteUserInfo = true;
  }

  performDeleteAction(data: any) {
    <% if(isStore){%>this.store.dispatch(deleteUser({ id: data?.id }));<%}%>
    <% if(isCrudWithNode){%>
      this.apiService.deleteEmployee(data?.id).subscribe(() =>
        this.getUsers()
      )
    <%}%>
    this.closeModal();
  }

  closeModal() {
    $('#addUser_modal').modal('hide');
    this.data = {};
  }
  <%}%>
}
