import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from "@ngrx/store";
import { addUser, updateUser } from 'src/app/utils/store/action/user.actions';
import { userState } from 'src/app/utils/store/reducer/user.reducer';
import {User} from 'src/app/utils/store/User';
import { v4 as uuid } from 'uuid';

declare let $: any;

@Component({
  selector: 'app-user-actions-modal',
  templateUrl: './user-actions-modal.component.html',
  styleUrls: ['./user-actions-modal.component.css']
})
export class UserActionsModalComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() shouldDeleteUser: boolean = false;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() performDeleteAction: EventEmitter<any> = new EventEmitter<any>();
  createUserForm!: FormGroup;
  user!: User;
  userActionLabel: string = 'Add';

  get registerFormControl() {
    return this.createUserForm.controls;
  }
  constructor( private fb: FormBuilder,  private store: Store<userState>, ) {  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnChanges(): void {
    if(!$.isEmptyObject(this.data)) {
      this.initForm()
      this.userActionLabel = 'Edit'
    } else this.userActionLabel = 'Add'
  }

  initForm() {
    this.createUserForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      email: [this.data?.email || '', [Validators.required]],
      username: [this.data?.username || '', [Validators.required]],
    });
  }

  onSubmit() {
    let userId = $.isEmptyObject(this.data) ? uuid().slice(0,8).toString() : this.data?.id;
    const userData = {
      id: userId,
      name: this.createUserForm.get('name')?.value,
      username: this.createUserForm.get('username')?.value,
      email: this.createUserForm.get('email')?.value
    }

    if($.isEmptyObject(this.data)) this.store.dispatch(addUser({user: userData}))
    else this.store.dispatch(updateUser({user: userData}))
    this.createUserForm.reset();
    this.closeModalRef();
  }

  deleteUserRef(data: any) {
    this.performDeleteAction.emit(data)
    this.createUserForm.reset();
  }

  closeModalRef() {
    this.closeEvent.emit();
    this.createUserForm.reset();
  }
}
