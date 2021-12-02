import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './Users';
import { AddUserModal } from '../UsersModal/AddUserModal/AddUserModal';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, reducer } from '../store/reducer/user.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { ButtonComponent } from 'src/app/components/atoms/Button/Button';
import { LabelComponent } from 'src/app/components/atoms/Label/Label';
import { InputComponent } from 'src/app/components/atoms/Input/Input';
import { DatepickerComponent } from 'src/app/components/atoms/Datepicker/Datepicker';
import { IgxDatePickerModule } from 'igniteui-angular';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModal } from 'src/app/modules/UsersModal/EditUserModal/EditUserModal';
import { TableComponent } from 'src/app/components/organisms/Table/Table';

@NgModule({
  declarations: [
    UsersModule,
    AddUserModal,
    UsersComponent,
    ButtonComponent,
    LabelComponent,
    InputComponent,
    DatepickerComponent,
    EditUserModal,
    TableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    IgxDatePickerModule,
    StoreModule.forFeature(userFeatureKey, reducer),
  ],
  providers: [ NgbActiveModal],
  exports: [
    UsersModule,
    AddUserModal,
    UsersComponent,
    ButtonComponent,
    LabelComponent,
    InputComponent,
    DatepickerComponent,
    EditUserModal,
    TableComponent
  ]
})
export class UserModule { };
