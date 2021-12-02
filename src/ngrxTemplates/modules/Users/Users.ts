import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User,usersData } from "./User";
import { select, Store } from "@ngrx/store";
import { selectusers } from "../store/selector/user.selectors";
import { userState } from "../store/reducer/user.reducer";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl } from "@angular/forms";
import { deleteUser } from "../store/action/user.actions";
import { EditUserModal } from "src/app/modules/UsersModal/EditUserModal/EditUserModal";
import { AddUserModal } from "../UsersModal/AddUserModal/AddUserModal";

@Component({
  selector: "users-module",
  templateUrl: "./Users.html",
  styleUrls: ["./Users.css"],
})
export class UsersModule implements OnInit {
  userForm: FormGroup;
  userTobeEdited: User;
  users = usersData;
  closeModal: any;
  users$: Observable<User[]>;
  constructor(private store: Store<userState>, private modalService: NgbModal) {
    this.users$ = this.store.pipe(select(selectusers));
  }
  openModal(user: User) {
    const modalRef = this.modalService.open(EditUserModal);
    modalRef.componentInstance.user = user
    modalRef.result.then((result: any) => {
      console.log(result);
    }, (reason: any) => {
    });
  }
  openAddModal() {
    const modalRef = this.modalService.open(AddUserModal);
    modalRef.result.then((result: any) => {
      console.log(result);
    }, (reason: any) => {
    });
  }
  deleteuser(id: string) {
    this.store.dispatch(deleteUser({ id }));
  }
  ngOnInit(): void { }
}
