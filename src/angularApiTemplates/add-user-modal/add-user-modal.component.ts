import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { v4 as uuid } from 'uuid';
import {ApiService} from 'src/app/shared/services/services'

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
  actionBtnText: string = 'Add';

  get registerFormControl() {
    return this.registerForm.controls;
  }
  constructor( private fb: FormBuilder, private apiService: ApiService ) {  }

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

    if(!$.isEmptyObject(this.data)) this.apiService.updateEmployee(this.data.id,userData).subscribe((res)=>{})
    else this.apiService.createEmployee(userData).subscribe((res)=>{})
    this.registerForm.reset();
    this.closeModlRef();
  }

  closeModlRef() {
    this.closeEvent.emit();
    this.registerForm.reset();
  }
}
