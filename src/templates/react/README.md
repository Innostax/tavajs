<div  align="center">

<a  href="https://innostax.com/">  <img  src="https://i2.wp.com/innostax.com/wp-content/uploads/2021/06/Innostax_-logo_edited.png?resize=400%2C82&ssl=1"  alt="Logo"  width="100%">
</a>

</div>

<br>
<br>

<div  align="center">

![Tavajs License](https://img.shields.io/npm/l/dev-tava)

![Tavajs Version](https://img.shields.io/npm/v/dev-tava)

![Tavajs Release](https://img.shields.io/badge/release-2021-orange)

![Tavajs Downloads](https://img.shields.io/npm/dw/dev-tava)

![Tavajs Stars](https://img.shields.io/badge/stars-4.5k-blue)

![Tavajs Language](https://img.shields.io/badge/javascript-70%25-green)

![Tavajs CI](https://img.shields.io/badge/CI-passing-green)

</div>

<div  id="top"></div>

<h1  align="center"><%=projectName%></h1>

## About The Project

React is a JavaScript library that is ideal for creating impressive apps.

One of the first things to remember about React project development is that it is a largely self-directed process. Unlike learning the basics of React via online tutorials and learning materials, there’ll not be much to guide you on building React projects. You’ll have to learn on a trial and error basis.

### FEATURES:
<ul>

<% if(isAuth0) { %><li><a  href="#auth0"> Auth0 Authentication Service</a></li><%}%>

<% if(isOkta) { %><li>  <a  href="#okta">Okta Authentication Service</a></li><%}%>

<% if(isStore) {%><li><a  href="#redux"> Redux Service </a></li><%}%>

<% if(isThemeProvider) {%><li>  <a  href="#themeService">Theme Service</a></li><%}%>

<% if(nodeName) {%>

<% if (dbName === 'postgres'){%><li><a  href="#postgres"> POSTGRES db service </a></li><%}%>

<% if (dbName === 'mysql') {%><li><a  href="#mysql">MYSQL db service </li></a><%}%>

<% if (dbName === 'mongoose') {%><li><a  href="#mongoose">MONGOOSE db service </li></a><%}%>

<%}%>

<% if (isSMTP) {%><li><a  href="#smtp">SMTP email service </li></a><%}%>

<% if (isSentry) {%><li><a  href="#sentry">Sentry logger service </li></a><%}%>

<% if (isWinston) {%><li><a  href="#winston">Winston logger service </li></a><%}%>

<% if (isCypress) {%><li><a  href="#cypress">Cypress test framework </li></a><%}%>

</ul>

### Built with:

<%if(nodeName){%>

<a  href="https://nodejs.org"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"  alt="nodejs"  width="100"  height="100"/>  </a>

<%}%>

<%if(projectChoice === "react"){%>

<a  href="https://reactjs.org/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"  alt="react"  width="100"  height="100"/>  </a>

 <%}%>

### Services:

<p  align="left">

<%if(!isMaterialUI){%>

</a>  <a  href="https://react-bootstrap.github.io/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg"  alt="bootstrap"  width="100"  height="100"/>  </a></p>

<%}%>

<%if(isMaterialUI){%>

</a>  <a  href="https://mui.com/"  target="_blank">  <img  src="https://v4.mui.com/static/logo_raw.svg"  alt="materialUI"  width="100"  height="100"/>  </a></p>

<%}%>

<%if(dbName === 'mongoose'){%>

<a  href="https://www.mongodb.com/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"  alt="mongodb"  width="100"  height="100"/>  </a>

<%}%>

<%if(dbName === 'mysql'){%>
  
<a  href="https://www.mysql.com/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"  alt="mysql"  width="100"  height="100"/>  </a>

<%}%>

<%if(dbName === 'postgres'){%>

<a  href="https://www.postgresql.org"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"  alt="postgresql"  width="100"  height="100"/>  </a>

<%}%>

<%if(isOkta){%>

<a  href=https://www.okta.com/  target="_blank"><img  src="https://www.vectorlogo.zone/logos/okta/okta-ar21.svg"  width="100"  alt="okta"  /></a>

<%}%>

<%if(isAuth0){%>

<a  href=https://auth0.com/  target="_blank"><img  src="https://www.vectorlogo.zone/logos/auth0/auth0-ar21.svg"  width="100"  alt="auth"  /></a>

<%}%>

<% if (isSentry) {%>

<a  href="https://sentry.io/welcome/"  target="_blank">  <img  src="https://blog.theodo.com/static/63d60039b4d984c7014f2b72544cf46c/ee604/sentry-logo.png"  alt="sentry"  width="100"  height="100"/>  </a>

<%}%>

<% if (isWinston) {%>

<a  href="https://www.npmjs.com/package/winston"  target="_blank">  <img  src="https://avatars.githubusercontent.com/u/9682013?s=200&v=4"  alt="winston"  width="100"  height="100"/>  </a>

<%}%>

<% if (isCypress) {%>

<a  href="https://www.cypress.io/"  target="_blank">  <img  src="https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/113/000/resized/logo_landscape_(1).png?1643756332"  alt="cypress"  width="300"  height="100"/>  </a>

<%}%>

### How to run created project :

<% if(nodeName) {%>

Use `npm start` inside <%= frontEndName %> directory to execute the template.
The command is defined in `package.json`, an example of which is below.
```

"scripts": {

"start": "npm run pretty && npm run eslint && npm run start-watch",

}

```
Use `npm start` inside <%= nodeName %> directory to execute the backend.

<%}else{%>

Use `npm start` to execute the template.

The command is defined in `package.json`, an example of which is below.

```

"scripts": {

"start": "npm run pretty && npm run eslint && npm run start-watch",

}

```

<%}%>

<% if(isAuth0) {%>

<div  id='auth0'/>

### Auth0 Authentication Service

Auth0 is an easy to implement, adaptable authentication and authorization platform.

### Configure environment variables for Auth0

Before running the app, you must update environment variables values in `.env` file.

<% if(nodeName) {%>

Inside `.env` file in <%= nodeName %> directory update environment variables:

```

AUTH_SECRET=Enter your secret key

AUTH_AUDIENCE=Enter your audience

AUTH_ISSUER=Enter your issuer

AUTH_CLIENTID=Enter your client id

```

Inside `.env` file in <%= frontEndName %> directory update environment variables:

```

REACT_APP_AUTH0_CLIENT_ID=your auth0 client Id

REACT_APP_AUTH0_DOMAIN=your Auth0 Domain

```

<%}else{%>

Inside `.env` file update environment variables:

```

REACT_APP_AUTH0_CLIENT_ID=your auth0 client Id

REACT_APP_AUTH0_DOMAIN=your Auth0 Domain

```

<%}%>

You can create your Auth0 account at <a  href="https://auth0.com/signup">Auth0/sign-up</a> [Create-Auth0-account]

<%}%>

<% if(isOkta) {%>

<div  id='okta'/>

### Okta Authentication Service

Okta is an easy to implement, adaptable authentication and authorization platform.

### Configure environment variables for Okta

Before running the app, you must update environment variables values in `.env` file.

Inside `.env` file update environment variables:

```

REACT_APP_OKTA_CLIENT_ID=your auth0 client Id

REACT_APP_OKTA_ISSUER=your Auth0 Domain

```

You can create your Okta account at <a  href="https://developer.okta.com/signup/">Okta/sign-up</a> [Create-Okta-account]

<%}%>

<% if(dbName === 'postgres') {%>

<div  id='postgres'/>

### Postgres Database Service

PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

### Configure environment variables for Postgres

Before running the app, you must update environment variable for postgres in `.env` file.

Inside `.env` file update environment variable:

```

DATABASE_URL=<%= dbName %>://username:password@localhost:5432/postgres

```

Update `username` and `password` for `DATABASE_URL` environment variable.

<%}%>

<% if(dbName === 'mongoose') {%>

<div  id='mongoose'/>

### Mongoose Database Service

MongoDB is one of the most widely used No-SQL databases in the developer world today.

### Configure environment variables for Mongoose

Before running the app, you must update environment variable for mongoose in `.env` file.

Inside `.env` file update your `DATABASE_URL` environment variable:

```

DATABASE_URL=mongodb://localhost:27017/admin

```

<%}%>

<% if(dbName === 'mysql') {%>

<div  id='mysql'/>

### MYSQL Database Service

MySQL is the world's most popular open source database. With its proven performance, reliability and ease-of-use, MySQL has become the leading database choice for web-based applications.

### Configure environment variables for MYSQL

Before running the app, you must update environment variable for MYSQL in `.env` file.

Inside `.env` file update `username` , `password` and `mydb` for `DATABASE_URL` environment variable as your username, password and database name.

```

DATABASE_URL=mysql://username:password@localhost:3306/mydb

```

<%}%>

<% if(isSMTP) {%>

<div  id='smtp'/>

### Email Service:

### SMTP email service

SMTP is most reliable SMTP service provider. It has a powerful API for sending transactional emails.

### Running SMTP service

Inside `.env` file in <%= nodeName %> directory update environment variables:

```

SMTP_USERNAME = your SMTP username

SMTP_PASSWORD = your SMTP password

SMTP_HOST = your SMTP host

```

Add recipient's email id in `recipients` object inside `mailObj` data property in `users.controllers.js` file.

<%}%>

<% if(isSentry) {%>

<div  id='sentry'/>

### Logger Service:

### Sentry Logger service

Sentry works with your application logging infrastructure, often integrating directly. It does not replace the need for those logs, and it's also not a destination for things that aren't actionable errors or crashes.

### Running Sentry service

Inside `sentry.js` file in <%= nodeName %> directory update environment variables:

```

dsn: "Enter your Domain Source Name",

```

<%}%>

<% if(isWinston) {%>

<div  id='winston'/>

### Winston Logger service

`winston` is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each `winston` logger can have multiple transports configured at different levels.

```

For winston there are no credentials required as the log is created in a log file which gets generated when you run the app.

```
<%}%>

<% if(isCypress) {%>

<div  id='cypress'/>

### Testing:

### Cypress test framework

Cypress is a next generation front end testing tool built for the modern web. Fast, easy and reliable testing for anything that runs in a browser.

### Running Cypress
```

npx cypress open

```

<%}%>

<% if(isThemeProvider) {%>

<div  id='themeService'/>

### Light and dark mode

A ReactJS-based switch to change style of page from Light to Dark or vice versa.

### How to add changes in light and dark mode

Use app.css file for any changes in light and dark mode.

Add or edit style by using class_name used in components.

```

body {  

background: var(--secondaryBackgroundColor);
  
color: var(--headingTextColor);  

}

```  

<%}%>

---

## License

Copyright (C)2021 Innostax

Licensed under the MIT License.

## Contact

<a  href="https://innostax.com/"> Innostax Software Labs</a>

<p  align="right">(<a  href="#top">back to top</a>)</p>