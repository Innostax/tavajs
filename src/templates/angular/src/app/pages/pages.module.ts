import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PagesModule { }
