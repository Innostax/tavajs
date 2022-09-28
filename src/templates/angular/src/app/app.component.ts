import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription, timer } from 'rxjs';
<%if(isCognito){%>import { AuthenticatorService } from '@aws-amplify/ui-angular';<%}%>
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';
  <%if(isCognito){%>constructor(public authenticator: AuthenticatorService) {}<%}%>
  onlineEvent!: Observable<Event>;
  offlineEvent!: Observable<Event>;

  subscriptions: Subscription[] = [];

  statusMessage!: string;
  networkstatus!: string;

  constructor() {}

  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.statusMessage = 'Back to online';
        this.networkstatus = 'Online';
        const source = timer(5000);
        source.subscribe(val => {
          this.statusMessage = '';
          this.networkstatus = '';
        });
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.statusMessage =
          'Connection lost! You are not connected to internet';
        this.networkstatus = 'Offline';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
