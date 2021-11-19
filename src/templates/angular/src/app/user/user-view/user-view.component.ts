import { Component, OnInit,OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';
import { User } from 'src/app/module/user';
import {select, Store} from '@ngrx/store';
import {selectusers} from '../store/selector/user.selectors';
import {userState} from '../store/reducer/user.reducer';
import { updateUser } from '../store/action/user.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { deleteUser } from '../store/action/user.actions';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
 userSubscription: Subscription;
  userForm: FormGroup ;
  user:User;
 
  
  
  users$: Observable<User[]>;
  
  constructor(private store: Store<userState>,private modalService: NgbModal) { 
    this.users$ = this.store.pipe(select(selectusers));
    console.log('Users&',this.users$)
    console.log('selectUsers&',selectusers)
    console.log('Userr',User)
    console.log('Store',store)
   } 
   
   

   open(content:any,user:User) {
     console.log('User',user)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    this.userForm.controls['name'].setValue(user.name)
    console.log('Name',user.name)
    this.userForm.controls['username'].setValue(user.username)
    console.log('UserName',user.username)
    this.userForm.controls['email'].setValue(user.email)
    console.log('Email',user.email)
    this.userForm.controls['id'].setValue(user.id)
    console.log('Id',user.id)
   
  }  

  edituser() {
    const user: User = {
      id:this.userForm.value.id,   
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
    };
    
    this.store.dispatch(updateUser({user}));
    console.log( 'Update User',user)
  }
 
   deleteuser(id:string){
     console.log('ID',id)
    this.store.dispatch(deleteUser({id}))
    console.log('Delete user',id)
   } 
  
  
     
  ngOnInit(): void {

    this.userForm = new FormGroup({
      id:new FormControl(),
      name: new FormControl(),
      username: new FormControl(),
     email: new FormControl()
     });

    
    
   
  } 
  
  

}

