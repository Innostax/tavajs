import { Component, OnInit } from '@angular/core';
<% if(isOkta){%>import { Inject } from '@angular/core';
import {Router} from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';<%}%>
<% if(isThemeProvider){%>import { FormBuilder, FormGroup } from '@angular/forms';<%}%>
<% if(isAuth0){ %>import { AuthService } from '@auth0/auth0-angular';<% } %>

<% if(isThemeProvider){%>
const DARK = 'dark';
const LIGHT = 'light';
const $body = document.body;
<% } %>
<% if(isAuth0){ %>const appURL = 'http://localhost:4200/';<% } %>

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  <% if(isThemeProvider){%> isChecked: boolean = true;
  headerForm!: FormGroup;<%}%>
  constructor( <% if(isThemeProvider){%> private fb: FormBuilder <%}%> <% if(isOkta && isThemeProvider){ %>,<% } %> <% if(isOkta){ %>private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth <%}%> <% if(isAuth0){ %>,public auth: AuthService<% } %>)  { }
  <% if(isOkta) { %>public name$!: Observable<string>;
  public isAuthenticated$!: Observable<boolean>;<% } %>
  <% if(isAuth0){ %> logoutURL = appURL; <% } %>
  ngOnInit(): void {
    <% if(isThemeProvider){%>
    this.selectedTheme()
    <%}%>

    <% if(isOkta) { %>
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.name$ = this._oktaStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
    <% } %>
  }
  <% if(isThemeProvider){%>

  selectedTheme() {
    const isThemeSelected: any = sessionStorage.getItem('isDarkModeSelected');
    const selected = JSON.parse(isThemeSelected);
    if(selected) $body.setAttribute('data-theme', DARK)
    else $body.setAttribute('data-theme', LIGHT);
    this.initForm(selected)
  }

  initForm(data: any) {
    this.headerForm = this.fb.group({
      selectedTheme: [data || '']
    })
  }
  handleSelection(event: any) {
    $body.setAttribute('data-theme', event.target.checked ? DARK : LIGHT);
    sessionStorage.setItem('isDarkModeSelected', JSON.stringify(event.target.checked));
  }
  <%}%>
  <% if(isOkta) { %>
    getInitials = (name: any) => {
      return name?.trim().split(' ').reduce((acc: string, curr: string, index: number) => {
        if(index === 0 || index === 1) acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        return acc;
      }, '');
    }
  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => this._router.navigate(['/profile'])
    );
  }
  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
  <%}%>
}
