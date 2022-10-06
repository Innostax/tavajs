import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<% if(isStore){%>import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';<%}%>
<% if(isCrudWithNode){%>import { HttpClientModule } from '@angular/common/http';<%}%>
<% if (isOkta) { %>import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';<% } %>
<% if(isAuth0){ %>import { AuthModule } from '@auth0/auth0-angular'; <% } %>
<% if(isAuth0 || isOkta || isStore || isCognito ){ %>
import { environment } from '../environments/environment';<% } %>
<% if (isOkta) { %>
const oktaAuth = new OktaAuth({
  issuer: environment.ANGULAR_APP_OKTA_ISSUER,
  clientId: environment.ANGULAR_APP_OKTA_CLIENT_ID,
  redirectUri: environment.ANGULAR_APP_API_URL});
<% } %>
<% if(isCognito){ %>
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';

Amplify.configure(environment.cognito);
<%}%>

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    <% if(isStore){%>StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],<%}%>
    SharedModule,
    PagesModule,
    <% if(isCrudWithNode){%>HttpClientModule,<%}%>
    <% if (isOkta) { %>OktaAuthModule,<% } %>
    <% if(isAuth0) { %>AuthModule.forRoot({
      domain: environment.AUTH0_YOUR_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID
    }),<% } %>
    <%if(isCognito){%>AmplifyAuthenticatorModule,<%}%>
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
