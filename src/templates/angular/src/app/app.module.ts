import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
<% if (isStore) {%>import { StoreModule } from '@ngrx/store';
  import { reducers, metaReducers } from './reducers';
  import { StoreDevtoolsModule } from '@ngrx/store-devtools';
  import { environment } from '../environments/environment';
  import { UserModule } from './modules/Users/user.module'; <% } %>
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule <% if(isStore) {%>,
      StoreModule.forRoot(reducers, { metaReducers }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      UserModule,
      BrowserAnimationsModule <%}%>
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
