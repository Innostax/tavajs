import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ApiService } from 'src/app/shared/services/services'

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
  userActionLabel: string = 'Add';

  get registerFormControl() {
    return this.createUserForm.controls;
  }
  constructor( private fb: FormBuilder, private apiService: ApiService ) {  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnChanges(): void {
    if(this.data?.name != '') {
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

  shouldDisableButton() {
    return ((this.createUserForm?.value.name == '' || this.createUserForm?.value.username == '' || this.createUserForm?.value.email == '') ? true : false)
  }

  onSubmit() {
    let userId = (this.data?.name == '') ? uuid().slice(0,8).toString() : this.data?.id;
    const userData = {
      id: parseInt(userId),
      name: this.createUserForm.get('name')?.value,
      username: this.createUserForm.get('username')?.value,
      email: this.createUserForm.get('email')?.value
    }

    if(this.data?.name != '') this.apiService.updateEmployee(this.data.id,userData).subscribe((res)=>{})
    else this.apiService.createEmployee(userData).subscribe((res)=>{})
    this.createUserForm.reset();
    // To-Do: Need to update api call for get users
    this.refreshView();
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

  refreshView() {
    window.location.reload();
  }
}
