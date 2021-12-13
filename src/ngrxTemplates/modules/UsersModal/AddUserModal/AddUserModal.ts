import { Component, OnInit } from "@angular/core";
import { User } from "../../Users/User";
import { userState } from "../../store/reducer/user.reducer";
import { addUser } from "../../store/action/user.actions";
import { Store } from "@ngrx/store";
import { FormGroup, FormControl } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "add-user-modal",
  templateUrl: "./AddUserModal.html",
  styleUrls: ["./AddUserModal.css"],
})
export class AddUserModal implements OnInit {
  userForm: FormGroup;
  constructor(
    private store: Store<userState>,
    public activeModal:NgbActiveModal
  ) {}
  addUser(): void {
    const user: User = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
    };
    this.store.dispatch(addUser({ user }));
    this.userForm.reset();
    this.activeModal.close();
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
