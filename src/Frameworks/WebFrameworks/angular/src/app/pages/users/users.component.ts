import { Component, OnInit } from '@angular/core';
<% if(isStore && !dbName ){%>import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { deleteUser } from 'src/app/utils/store/action/user.actions';
import { userState } from 'src/app/utils/store/reducer/user.reducer';
import { selectusers } from 'src/app/utils/store/selector/user.selectors';
import { User } from 'src/app/utils/store/User';<%}%>
<% if(dbName){%>import {ApiService} from 'src/app/shared/services/services'<%}%>
<% if(isStore || dbName){%>
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
  <% if(isTailWind || isMaterialUI){%> showModal = false;<%}%>
  <% if(isStore || dbName){%>
  headers = ['name', 'username', 'email', 'actions'];
  shouldShowActions: boolean = true;
  data: any = {};
  deleteUserInfo: boolean = false;
  <%}%>
  <% if(dbName){%> users: any;<%}%>
  <% if(isStore && !dbName){%>
  users$: Observable<User[]>;
  <%}%>
  constructor(<% if(isStore && !dbName){%> private store: Store<userState>, private modalService: NgbModal, <%}%> <% if(dbName){%> private apiService: ApiService <%}%>) {
    <% if(isStore && !dbName){%> this.users$ = this.store.pipe(select(selectusers)); <%}%>
  }

  ngOnInit(): void {
    <% if(dbName){%>this.getUsers(); <%}%>
  }

  <% if(dbName){%>
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

  <% if(isStore || dbName){%>
  onClickAddUser() {
    <% if(isBootstrap){%>$('#addUser_modal').modal('show');<%}%>
    <% if(isTailWind || isMaterialUI){%>this.showModal = true;<%}%>
    this.data = {name: '', username:'', email: ''};
    this.deleteUserInfo = false;
  }

  public handleUserActions = (name: string, user: any) => {
    if(name == EDIT) this.editUser(user)
    if(name == DELETE) this.deleteUser(user)
  }

  editUser(data: any) {
    <% if(isBootstrap){%>$('#addUser_modal').modal('show');<%}%>
    <% if(isTailWind || isMaterialUI){%>this.showModal = true;<%}%>
    this.data = data;
    this.deleteUserInfo = false;
  }

  deleteUser(data: any) {
    <% if(isBootstrap){%>$('#addUser_modal').modal('show');<%}%>
    <% if(isTailWind || isMaterialUI){%>this.showModal = true;<%}%>
    this.data = data;
    this.deleteUserInfo = true;
  }

  performDeleteAction(data: any) {
    <% if(isStore && !dbName ){%>this.store.dispatch(deleteUser({ id: data?.id }));<%}%>
    <% if(dbName){%>
      this.apiService.deleteEmployee(data?.id).subscribe(() =>
        this.getUsers()
      )
    <%}%>
    this.closeModal();
  }

  closeModal() {
    <% if(isBootstrap){%>$('#addUser_modal').modal('hide');<%}%>
    <% if(isTailWind || isMaterialUI){%>this.showModal = false;<%}%>
    this.data = {};
  }
  <%}%>
}
