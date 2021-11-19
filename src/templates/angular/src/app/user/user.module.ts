import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import {StoreModule} from '@ngrx/store';
import {userFeatureKey, reducer} from './store/reducer/user.reducer';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserViewComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(userFeatureKey, reducer),
  ],
  exports: [
        UserViewComponent,
        AddUserComponent
      ]
})
export class UserModule { }
