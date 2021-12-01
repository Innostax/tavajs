import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './Users';
import { AddUserComponent } from '../UsersModal/AddUserModal/AddUser';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, reducer } from '../store/reducer/user.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from 'src/app/pages/users/users.component';
import { ButtonComponent } from 'src/app/components/atoms/Button/Button';
import { LabelComponent } from 'src/app/components/atoms/Label/Label';
import { InputComponent } from 'src/app/components/atoms/Input/Input';
import { DatepickerComponent } from 'src/app/components/atoms/Datepicker/Datepicker';
import { IgxDatePickerModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent,
    UserComponent,
    ButtonComponent,
    LabelComponent,
    InputComponent,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IgxDatePickerModule,
    StoreModule.forFeature(userFeatureKey, reducer),
  ],
  exports: [
    UsersComponent,
    AddUserComponent,
    UserComponent,
    ButtonComponent,
    LabelComponent,
    InputComponent,
    DatepickerComponent
  ]
})
export class UserModule { };
