import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganismsComponent } from './components/organisms/organisms.component';
import { UsersComponent } from './screens/users/users.component';

const routes: Routes = [
  { path: 'home', component: OrganismsComponent },
  { path: 'user', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
