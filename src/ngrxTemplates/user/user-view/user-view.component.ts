import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/module/user";
import { select, Store } from "@ngrx/store";
import { selectusers } from "../store/selector/user.selectors";
import { userState } from "../store/reducer/user.reducer";
import { updateUser } from "../store/action/user.actions";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl } from "@angular/forms";
import { deleteUser } from "../store/action/user.actions";

@Component({
  selector: "app-user-view",
  templateUrl: "./user-view.component.html",
  styleUrls: ["./user-view.component.css"],
})
export class UserViewComponent implements OnInit {
  userForm: FormGroup;
  userTobeEdited: User;
  users$: Observable<User[]>;
  constructor(private store: Store<userState>, private modalService: NgbModal) {
    this.users$ = this.store.pipe(select(selectusers));
  }
  open(editusermodal: any, user: User) {
    this.modalService.open(editusermodal, {
      ariaLabelledBy: "modal-basic-title",
    });
    this.userTobeEdited = user;
  }
  edituser() {
    const user: User = {
      id: this.userTobeEdited.id,
      name: this.userForm.value.name || this.userTobeEdited.name,
      username: this.userForm.value.username || this.userTobeEdited.username,
      email: this.userForm.value.email || this.userTobeEdited.email,
    };
    this.store.dispatch(updateUser({ user }));
  }
  deleteuser(id: string) {
    this.store.dispatch(deleteUser({ id }));
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
    });
  }
  checkupdate(key: any, event: any) {
    this.userForm.value[key] = event.target.value;
  }
}
