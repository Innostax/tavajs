import { Component } from '@angular/core';
<%if(isCognito){%>import { AuthenticatorService } from '@aws-amplify/ui-angular';<%}%>
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';
  <%if(isCognito){%>constructor(public authenticator: AuthenticatorService) {}<%}%>

}
