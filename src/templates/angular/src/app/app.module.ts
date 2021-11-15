import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrganismsComponent } from './components/organisms/organisms.component';
import { UsersComponent } from './Screens/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganismsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
