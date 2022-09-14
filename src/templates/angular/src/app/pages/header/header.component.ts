import { Component, OnInit } from '@angular/core';
<% if(isDark){%> import { FormBuilder, FormGroup } from '@angular/forms';
const $body = document.body; <%}%>
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  <% if(isDark){%> isChecked: boolean = true;
  headerForm!: FormGroup;<%}%>
  constructor( <% if(isDark){%> private fb: FormBuilder <%}%>) { }
  ngOnInit(): void {
    <% if(isDark){%>
    let isThemeSelected: any = sessionStorage.getItem('isDarkModeSelected');
    let selected = JSON.parse(isThemeSelected);
    if(selected) $body.setAttribute('data-theme', 'dark')
    else $body.setAttribute('data-theme', 'light');
    this.initForm(selected)  <%}%>
  }
  <% if(isDark){%>
  initForm(data: any) {
    this.headerForm = this.fb.group({
      themeSelection: [data || '']
    })
  }
  handleSelection(event: any) {
    (event.target.checked) ? $body.setAttribute('data-theme', 'dark') : $body.setAttribute('data-theme', 'light');
    sessionStorage.setItem('isDarkModeSelected', JSON.stringify(event.target.checked));
  }
  <%}%>
}
