import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from "@ngrx/store";
import { addUser, updateUser } from 'src/app/utils/store/action/user.actions';
import { userState } from 'src/app/utils/store/reducer/user.reducer';
import {User} from 'src/app/utils/store/User';
import { v4 as uuid } from 'uuid';

declare let $: any;

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  registerForm!: FormGroup;
  user!: User;
  actionBtnText: string = 'Add';

  get registerFormControl() {
    return this.registerForm.controls;
  }
  constructor( private fb: FormBuilder,  private store: Store<userState>, ) {  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnChanges(): void {
    if(!$.isEmptyObject(this.data)) {
      this.initForm()
      this.actionBtnText = 'Edit'
    } else this.actionBtnText = 'Add'
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      email: [this.data?.email || '', [Validators.required]],
      username: [this.data?.username || '', [Validators.required]],
    });
  }

  onSubmit() {
    let userId = $.isEmptyObject(this.data) ? uuid().slice(0,8).toString() : this.data?.id;
    const userData = {
      id: userId,
      name: this.registerForm.get('name')?.value,
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value
    }

    if($.isEmptyObject(this.data)) this.store.dispatch(addUser({user: userData}))
    else this.store.dispatch(updateUser({user: userData}))
    this.registerForm.reset();
    this.closeModlRef();
  }

  closeModlRef() {
    this.closeEvent.emit()
  }
}
