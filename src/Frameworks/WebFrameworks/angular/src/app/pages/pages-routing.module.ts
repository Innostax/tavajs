import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
<%if(isOkta){%>import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular/';<%}%>
<% if(isAuth0){ %>import { AuthGuard } from '@auth0/auth0-angular';<% } %>

const routes: Routes = [
  { path: '', component: HomeComponent<% if(isOkta){ %>, canActivate: [OktaAuthGuard]<% } %> <% if(isAuth0){ %>, canActivate: [AuthGuard] <% } %>  },
  { path: 'users', component: UsersComponent<% if(isOkta){ %>, canActivate: [OktaAuthGuard]<% } %> <% if(isAuth0){ %>, canActivate: [AuthGuard] <% } %>  }
];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
