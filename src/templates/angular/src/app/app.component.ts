import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription, timer } from 'rxjs';
<%if(isCognito){%>import { AuthenticatorService } from '@aws-amplify/ui-angular';<%}%>
 
const ONLINE = 'online';
const OFFLINE = 'offline';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';
  <%if(isCognito){%>constructor(public authenticator: AuthenticatorService) {}<%}%>
  onlineEvent!: Observable<Event>;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];
  statusMessage!: string;
  networkstatus!: string;

  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, ONLINE);
    this.offlineEvent = fromEvent(window, OFFLINE);

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.networkstatus = 'Online';
        this.statusMessage = 'Back to online';
        const shouldShowTill = timer(5000);
        shouldShowTill.subscribe(() => {
          this.statusMessage = '';
          this.networkstatus = '';
        });
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.networkstatus = 'Offline';
        this.statusMessage = 'Connection lost! You are not connected to internet';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
