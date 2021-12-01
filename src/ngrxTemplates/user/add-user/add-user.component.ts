import { Component, OnInit } from "@angular/core";
import { User } from "src/app/module/user";
import { userState } from "../store/reducer/user.reducer";
import { addUser } from "../store/action/user.actions";
import { Store } from "@ngrx/store";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private store: Store<userState>,
    private modalService: NgbModal
  ) {}
  open(addUserModal: any) {
    this.modalService.open(addUserModal, {
      ariaLabelledBy: "modal-basic-title",
    });
  }
  addUser(): void {
    const user: User = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
    };
    this.store.dispatch(addUser({ user }));
    this.userForm.reset();
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
    });
  }
  UpdateValue(key: any, event: any) {
    this.userForm.value[key] = event.target.value;
  }
}
