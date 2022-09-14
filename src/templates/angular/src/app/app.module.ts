import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
<% if(isStore){%>import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';<%}%>
<% if (isOkta) { %>import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';<% } %>

<% if (isOkta) { %>
const oktaAuth = new OktaAuth({
issuer: 'https://dev-92460433.okta.com/oauth2/default',
clientId: '0oa6hbg1zjS6c8oON5d7',
redirectUri: window.location.origin+'/login/callback'});
<% } %>
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    <% if(isStore){%>StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],<%}%>
    SharedModule,
    <% if (isOkta) { %>OktaAuthModule,<% } %>
    PagesModule
  ],
  providers: [
    <% if (isOkta) { %>{
      provide:  OKTA_CONFIG,
      useValue: { oktaAuth }
    }<% } %>
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
