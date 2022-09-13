import { Component, OnInit } from '@angular/core';
<% if(isStore){%>import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { deleteUser } from 'src/app/utils/store/action/user.actions';
import { userState } from 'src/app/utils/store/reducer/user.reducer';
import { selectusers } from 'src/app/utils/store/selector/user.selectors';
import { User } from 'src/app/utils/store/User';<%}%>

declare let $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  <% if(isStore){%>data: any = {};
  users$: Observable<User[]>;<%}%>
  constructor(<% if(isStore){%> private store: Store<userState>, private modalService: NgbModal <%}%>) {
    <% if(isStore){%> this.users$ = this.store.pipe(select(selectusers)); <%}%>
  }

  ngOnInit(): void {
  }
  <% if(isStore){%>
  onClickAddUser() {
    $('#addUser_modal').modal('show');
    this.data = {};
  }

  editUser(data: any) {
    $('#addUser_modal').modal('show');
     this.data= data;
  }

  deleteUser(data: any) {
    this.store.dispatch(deleteUser({ id: data }));
  }

  closeModal() {
    $('#addUser_modal').modal('hide');
    this.data = {};
  }
  <%}%>
}
