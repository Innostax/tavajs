import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
<%if(isOkta){%>import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular/';<%}%>
<% if(isAuth0){ %>import { AuthGuard } from '@auth0/auth0-angular';<% } %>
const routes: Routes = [
  { path: '', component: HomeComponent <% if(isOkta){ %>, canActivate: [OktaAuthGuard]<% } %> <% if(isAuth0){ %>, canActivate: [AuthGuard] <% } %> },
  { path: 'home', component: HomeComponent <% if(isOkta){ %>,  canActivate: [OktaAuthGuard]<% } %> <% if(isAuth0){ %>, canActivate: [AuthGuard] <% } %> },
  <% if(isOkta){ %>,{ path: 'login/callback', component: OktaCallbackComponent }<% } %>
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
