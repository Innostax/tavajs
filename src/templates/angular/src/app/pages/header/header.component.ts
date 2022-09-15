import { Component, OnInit } from '@angular/core';
<% if(isOkta){%>import { Inject } from '@angular/core';
import {Router} from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';<%}%>
<% if(isDark){%> import { FormBuilder, FormGroup } from '@angular/forms';

const DARK= 'dark';
const LIGHT= 'light';
const $body = document.body; <%}%>
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  <% if(isDark){%> isChecked: boolean = true;
  headerForm!: FormGroup;<%}%>
  constructor( <% if(isDark){%> private fb: FormBuilder <%}%> <% if(isOkta && isDark) { %>,<% } %> <% if(isOkta) { %> private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth <% } %>)  { }
  <% if(isOkta) { %>public name$!: Observable<string>;
  public isAuthenticated$!: Observable<boolean>;<% } %>

  ngOnInit(): void {
    <% if(isDark){%>
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
  <% if(isDark){%>

  selectedTheme() {
    let isThemeSelected: any = sessionStorage.getItem('isDarkModeSelected');
    let selected = JSON.parse(isThemeSelected);
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
