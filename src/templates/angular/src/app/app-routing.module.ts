import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
<%if(isOkta){%>import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular/';<%}%>

const routes: Routes = [
  { path: '', component: HomeComponent <% if(isOkta){%>, canActivate: [OktaAuthGuard]<%}%> }<% if(isOkta){%>,
  { path: 'home', component: HomeComponent, canActivate: [OktaAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent }<%}%>
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
