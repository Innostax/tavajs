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
const EDIT = 'edit';
const DELETE = 'delete';
<%}%>
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  <% if(isTailwindCSS){%> showModal = false;<%}%>
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
      this.apiService.getEmployees().subscribe(
        (res: any) =>
          {
            this.users = res.map((each: any)=> ({
              id: each.id,
              name: each.name,
              username: each.username,
              email: each.email
            }))
          }
      );
    }
  <%}%>

  <% if(isCrud || isCrudWithNode){%>
  onClickAddUser() {
    <% if(!isTailwindCSS){%>$('#addUser_modal').modal('show');<%}%>
    <% if(isTailwindCSS){%>this.showModal = true;<%}%>
    this.data = {name: '', username:'', email: ''};
    this.deleteUserInfo = false;
  }

  public handleUserActions = (name: string, user: any) => {
    if(name == EDIT) this.editUser(user)
    if(name == DELETE) this.deleteUser(user)
  }

  editUser(data: any) {
    <% if(!isTailwindCSS){%>$('#addUser_modal').modal('show');<%}%>
    <% if(isTailwindCSS){%>this.showModal = true;<%}%>
    this.data = data;
    this.deleteUserInfo = false;
  }

  deleteUser(data: any) {
    <% if(!isTailwindCSS){%>$('#addUser_modal').modal('show');<%}%>
    <% if(isTailwindCSS){%>this.showModal = true;<%}%>
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
    <% if(!isTailwindCSS){%>$('#addUser_modal').modal('hide');<%}%>
    <% if(isTailwindCSS){%>this.showModal = false;<%}%>
    this.data = {};
  }
  <%}%>
}
