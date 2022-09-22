<div  align="center">
<a  href="https://innostax.com/">  <img  src="https://i2.wp.com/innostax.com/wp-content/uploads/2021/06/Innostax_-logo_edited.png?resize=400%2C82&ssl=1"  alt="Logo"  width="100%">
</a>
</div>

<br>
<br>

<div align="center">

![Tavajs License]([https://img.shields.io/npm/l/dev-tava](https://img.shields.io/npm/l/dev-tava))
![Tavajs Version]([https://img.shields.io/npm/v/dev-tava](https://img.shields.io/npm/v/dev-tava))
![Tavajs Release]([https://img.shields.io/badge/release-2022-orange](https://img.shields.io/badge/release-2021-orange))
![Tavajs Downloads]([https://img.shields.io/npm/dw/dev-tava](https://img.shields.io/npm/dw/dev-tava))
![Tavajs Stars]([https://img.shields.io/badge/stars-4.5k-blue](https://img.shields.io/badge/stars-4.5k-blue))
![Tavajs Language]([https://img.shields.io/badge/javascript-70%25-green](https://img.shields.io/badge/javascript-70%25-green))
![Tavajs CI]([https://img.shields.io/badge/CI-passing-green](https://img.shields.io/badge/CI-passing-green))

</div>
<div id="top"></div>

<h1 align="center"><%=projectName%></h1>

## About The Project
  
[Angular][Angular-url] is a JavaScript framework that is ideal for creating impressive apps.
It builds on top of standard HTML, CSS & JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

## Code scaffolding

  
Run `ng generate component component-name` to generate a new component. 
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

**Example**: for module generation: `ng generate module module-name --flat --module=app`
`--flat`: Create the new files at the top level of the current project.
`--module`: The declaring NgModule. `Aliases:  -m`

> [Angular.io/cli/generate][Angular-generate]

<div id="features"></div>

## FEATURES:
<ul>
	<% if(isAuth0) { %><li><a href="#auth0"> Auth0 Authentication Service</a></li><%}%>
	<% if(isOkta) { %><li><a href="#okta"> Okta Authentication Service</a></li><%}%>
	<% if(isStore) {%><li><a href="#ngrx"> Ngrx Service</a></li><%}%>
	<% if(isThemeProvider) {%><li><a href="#theme"> Theme Service</a></li><%}%>
	<% if (isSMTP) {%><li><a href="#smtp">SMTP email service</a></li><%}%>
	<% if(nodeName) {%>
	<% if (dbName === 'postgres') {%><li><a href="#postgres">POSTGRES db service</a></li><%}%>
	<% if (dbName === 'mysql') {%><li><a href="#mysql">MYSQL db service</a></li><%}%>
	<% if (dbName === 'mongoose') {%><li><a href="#mongoose">MONGOOSE db service</a></li><%}%>
	<%}%>
</ul>  

### Built with:

<%if(nodeName){%><a  href="https://nodejs.org"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"  alt="nodejs"  width="100"  height="100"/>  </a><%}%> <%if(projectChoice === "angular"){%><a  href=[Angular-url] target="_blank">  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" width="100" alt="Angularjs" />
 </a> <a  href="https://getbootstrap.com"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg"  alt="bootstrap"  width="100"  height="100"/>  </a></p>
### Services:

<p  align="left">
<%if(dbName === 'mongoose'){%>
<a  href="https://www.mongodb.com/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"  alt="mongodb"  width="100"  height="100"/>  </a>  
<%}%>
<%if(dbName === 'mysql'){%>
<a  href="https://www.mysql.com/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"  alt="mysql"  width="100"  height="100"/>  </a> 
<%}%> 
<%if(dbName === 'postgres'){%>
<a  href="https://www.postgresql.org"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"  alt="postgresql"  width="100"  height="100"/>  </a>
<%}%>
<a  href="https://karma-runner.github.io/latest/index.html"  target="_blank">  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/karma/karma-original.svg"  alt="Karma"  width="100"  height="100"/>  </a>
<%if(isOkta){%>
<a  href=https://www.okta.com/ target="_blank">  
  <img src="https://www.vectorlogo.zone/logos/okta/okta-ar21.svg" width="100" alt="okta" />
</a>
<%}%>
<%if(isAuth0){%>
<a  href=https://auth0.com/ target="_blank">  
  <img src="https://www.vectorlogo.zone/logos/auth0/auth0-ar21.svg" width="100" alt="auth" />
</a>
<%}%>
<%}%>



<p align="left">
<a href="[Docker-link]([Docker-link])" target="_blank"><img src="[Docker-icon]([Docker-link])" alt="docker" width="100" height="100"/></a>
<a href="[Mongodb-link]([Mongodb-link])" target="_blank"><img src="[Mongodb-icon]([Mongodb-icon])" alt="mongodb" width="100" height="100"/></a>
<a href="[Sql-link]([Sql-link])" target="_blank"><img src="[Sql-icon]([Sql-icon])" alt="mysql" width="100" height="100"/></a>
<a href="[Postgres-link]([Postgres-link])" target="_blank"><img src="[Postgres-icon]([Postgres-icon])" alt="postgresql" width="100" height="100"/><a>
<a href="[Azure-link]([Azure-link])" target="_blank"><img src="[Azure-icon]([Azure-icon])" alt="azure" width="100" height="100"/></a>
<a href="[Aws-link]([Aws-link])" target="_blank"><img src="[Aws-link]([Aws-link])" alt="aws" width="100" height="100"/></a>
</p>

## How to run created project:
<% if(nodeName) {%>

Use `npm start` inside <%= frontEndName %> directory to execute the template.
The command is defined in `package.json`, an example of which is below.

```
"scripts": {
	"start": "ng serve"
}
```
Use `npm start` inside <%= nodeName %> directory to execute the backend.

The command is defined in `package.json`, an example of which is below.

```
"scripts": {
    "start": "npm run start-watch",
}
```

<%}else{%>

Use `npm start` to execute the template.
The command is defined in `package.json`, an example of which is below.

```
"scripts": {
	"start": "ng serve"
}
```
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<% if(isAuth0) {%>
<!----------------------------- Auth0  ----------------------------------------->
<div id="auth0"></div>

## Auth0 Authentication Service

Auth0 is an easy to implement, adaptable authentication and authorization platform.

### Configure environment variables for Auth0
Before running the app, you must update environment variables values in `enviroment.ts` file.

<% if(nodeName) {%>
Inside `enviroment.ts` file in <%= nodeName %> directory update environment variables:

```
AUTH_ISSUER=Enter your issuer
AUTH_CLIENTID=Enter your client id
```
Inside `enviroment.ts` file in <%= frontEndName %> directory update environment variables:

```
AUTH0_CLIENT_ID = your auth0 client Id
AUTH0_DOMAIN = your Auth0 Domain
```

<%}else{%>

Inside `enviroment.ts` file update environment variables:

```
CLIENT_ID = your auth0 client Id
YOUR_DOMAIN = your Auth0 Domain
```
<%}%>
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<% if(isOkta) {%>
<!----------------------------------- Okta -------------------------------------------->
<div id="okta"></div>

## Okta Authentication Service

Okta is an easy-to-implement, adaptable authentication and authorization platform.

### Configure environment variables for Auth0
Before running the app, you must update environment variables values in `enviroment.ts` file.

Inside `enviroment.ts` file update environment variables:

```
ANGULAR_APP_OKTA_ISSUER: OKTA_ISSUER
ANGULAR_APP_OKTA_CLIENT_ID: OKTA_CLIENT_ID   
ANGULAR_APP_API_URLs: API_URLs
```
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<% if(isStore) {%>
<!--------------------------------- Ngrx ------------------------------------------------>
<div id="ngrx"></div>

## Ngrx

RxJS powered state management for Angular applications, inspired by Redux

### @ngrx/store

@ngrx/store is a controlled state container designed to help write performant, consistent applications on top of Angular. Core tenets:
-   State is a single immutable data structure
-   Actions describe state changes
-   Pure functions called reducers take the previous state and the next action to compute the new state
-   State accessed with the  `Store`, an observable of state and an observer of actions

`Package Used`: `@ngrx/store` `@ngrx/store-devtools`

Important Links: [Docs][Ngrx-docs], [Store][Ngrx-store], [Effect][Ngrx-effect]
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<% if(isThemeProvider) {%>
<!-------------------------- Theme Provider -------------------------------------------->
<div id="theme"></div>

## Light and dark mode

A VueJs-based switch to change style of page from Light to Dark or vice versa.

### How to add changes in light and dark mode
```
:root {
	// Light mode variable
	--background-color: #fff;
	--text-color: #121416d8;
	--link-color: #543FD7;
	// Dark mode variables
	--dark-background-color: #212A2E;
	--dark-text-color: #F7F8F8;
	--dark-link-color: #828FFF;
}
```
 Use the `style.css` file to implement changes related to the light mode or you can just update the hex code in style.css & same for dark mode as well if need to update the color code just updates the variables labeled as `--dark..., if need to add new styling use selector `[data-theme='dark']` followed up with the class name.

**Example :**

|Light Theme                    				|Dark Theme                         				|
|-----------------------------------------------|---------------------------------------------------|
|[data-theme='light'] {							|[data-theme='dark'] {								|
|	background-color: var(--background-color);	|	background-color: var(--dark-background-color); |
|	color: var(--text-color);					|	color: var(--dark-text-color);					|
|}      										|}            										|
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<% if(isSMTP) {%>
<!---------------------------------- Email service ------------------------------------------->
<div id='smtp'></div>

## Email Services:

### SMTP email service:
SMTP is most reliable SMTP service provider. It has a powerful API for sending transactional emails.

  

### Running SMTP service

Inside `.env` file in <%= nodeName %> directory update environment variables:

```
SMTP_USERNAME = your SMTP username
SMTP_PASSWORD = your SMTP password
SMTP_HOST = your SMTP host
```

Add recipient's email id in `recipients` object inside `mailObj` data property in `users.controllers.js` file.
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<div id='postgres'></div>
<!-------------------------------- Postgres ------------------------------------------->
<% if(dbName === 'postgres') {%>

## Postgres Database Service

PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

### Configure environment variables for Postgres

Before running the app, you must update environment variable for postgres in `.env` file.
Inside `.env` file update environment variable:
```
DATABASE_URL=<%= dbName %>://username:password@localhost:5432/postgres
```
Update `username` and `password` for `DATABASE_URL` environment variable.
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<div id='mongoose'></div>
<!--------------------------------- MongoDB -------------------------------------------->
<% if(dbName === 'mongoose') {%>

## Mongoose Database Service

MongoDB is one of the most widely used No-SQL databases in the developer world today.

### Configure environment variables for Mongoose

Before running the app, you must update environment variable for mongoose in `.env` file.
Inside `.env` file update your `DATABASE_URL` environment variable:
```
DATABASE_URL=mongodb://localhost:27017/admin
```
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

<div id='mysql'></div>
<!------------------------------------- My Sql  ----------------------------------------->
<% if(dbName === 'mysql') {%>

## MYSQL Database Service

MySQL is the world's most popular open source database. With its proven performance, reliability and ease-of-use, MySQL ease of using the leading database choice for web-based applications.

### Configure environment variables for MYSQL

Before running the app, you must update environment variable for MYSQL in `.env` file.

Inside `.env` file Update `username` , `password` and `mydb` for `DATABASE_URL` environment variable as your username, password & database name.
```
DATABASE_URL=mysql://username:password@localhost:3306/mydb
```
> Note: create `mydb` schema, in MySql workbench
<p align="right">(<a href="#features">back to features</a>)</p>
<%}%>

## Running unit tests

Run `ng test` to execute the unit tests via [Karma][Karma-test].

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help  

To get more help on the Angular CLI use `ng help` or go check out the 
[Angular CLI Overview and Command Reference][Angular-cli] page.

## Some Important Links

Official Documentation: [Angular.io][Angular-url]
Developer guide: [Angular.io/guide/developer-guide][Angular-dev-guide]
Built-In directives: [Angular.io/guide/built-in-directives][Angular-directive]
Template overview: [Angular.io/guide/template-overview][Angular-template]

## License

Copyright (C)2021 Innostax
Licensed under the MIT License.

## Contact

<a href="[Innostax]([Innostax])"> Innostax Software Labs</p>
<p align="right">(<a href="#top">back to top</a>)</p>

<!---------------------------------------------------------- Global Variable's ---------------------------------------------------------->
[Innostax]: https://innostax.com/
[Innostax-logo]: https://i2.wp.com/innostax.com/wp-content/uploads/2021/06/Innostax_-logo_edited.png?resize=400%2C82&ssl=1
<!-- Frontend, Angular -->
[Angular-icon]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Angular-cli]: https://angular.io/cli
[Angular-dev-guide]: https://angular.io/guide/developer-guide-overview
[Angular-directive]: https://angular.io/guide/built-in-directives
[Angular-template]: https://angular.io/guide/template-overview
[Angular-generate]: https://angular.io/cli/generate

<!-- Ngrx -->
[Ngrx-docs]: https://ngrx.io/docs/
[Ngrx-store]: https://ngrx.io/guide/store/
[Ngrx-effect]: https://ngrx.io/guide/effects/

<!-- Auth Services: Auth 0 -->
[Auth0]: https://auth0.com/

<!-- Auth Services: Okta -->
[Okta]: https://www.okta.com/
[Okta-signup]: https://login.okta.com/signin/register/?SAMLRequest=fc%2B7CsJAEAXQXvAflu1NNJUMeZBGELTx1a%2FrYILJTtyZGD%2FfSBRiYzlw77lMnD3rSj3Qc0ku0YtgrhU6S5fSXRN9PKxmS52l00nMpq6iBvJWCrfDe4ss6vStRe9aDzmGIZfo1jsgwyWDMzUyiIV9vt1AH4XGk5ClSvewUgMNa%2BYW%2FVj5jxhm9NLP67QQaSAMu64L6CYmsFSHlnzT4ZlLwTgcL6Sf8%2FeX9AU%3D

<!-- Backend  -->
<!-- Node -->
[Nodejs-icon]: https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg

<!-- Test -->
[Karma-test]: https://karma-runner.github.io

<!-- CSS Libs -->
[Bootstrap-icon]: https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg

<!-- Dev Icons & link -->
[Docker-link]: https://www.docker.com/
[Docker-icon]: https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg
[Mongodb-link]: https://www.mongodb.com/
[Mongodb-icon]: https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg
[Sql-link]: https://www.mysql.com/
[Sql-icon]: https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg
[Postgres-link]: https://www.postgresql.org/
[Postgres-icon]: https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg
[Azure-link]: https://azure.microsoft.com/en-in/
[Azure-icon]: https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg
[Aws-link]: https://aws.amazon.com/
[Aws-icon]: https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg
