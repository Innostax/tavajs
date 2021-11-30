import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import {StoreModule} from '@ngrx/store';
import {userFeatureKey, reducer} from './store/reducer/user.reducer';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from '../pages/users/users.component';
import { ButtonComponent } from '../components/atoms/Button/Button';
import { LabelComponent } from '../components/atoms/Label/Label';
import { InputComponent } from '../components/atoms/Input/Input';
import { DatepickerComponent } from '../components/atoms/Datepicker/Datepicker';
import { IgxDatePickerModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    UserViewComponent,
    AddUserComponent,
    UsersComponent,
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
        UserViewComponent,
        AddUserComponent,
        UsersComponent,
        ButtonComponent,
        LabelComponent,
        InputComponent,
        DatepickerComponent
      ]
})
export class UserModule { };
