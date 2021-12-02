import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/modules/Users/User';
import { updateUser } from 'src/app/modules/store/action/user.actions';
import { userState } from 'src/app/modules/store/reducer/user.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-modal',
  templateUrl: './EditUserModal.html',
  styleUrls: ['./EditUserModal.css']
})
export class EditUserModal implements OnInit {
 @Input() user:User;
 userForm:FormGroup;
    constructor(private store: Store<userState>,public activeModal:NgbActiveModal) {}
      edituser() {
        const user: User = {
          id: this.user.id,
          name: this.userForm.value.name || this.user.name,
          username: this.userForm.value.username || this.user.username,
          email: this.userForm.value.email || this.user.email,
        };
        this.store.dispatch(updateUser({ user }));
        this.activeModal.close();
      }
      UpdateValue(key: any, event: any) {
        this.userForm.value[key] = event.target.value;
      }
      ngOnInit(): void {
        this.userForm = new FormGroup({
          id: new FormControl(),
          name: new FormControl(),
          username: new FormControl(),
          email: new FormControl(),
        });
      }
}