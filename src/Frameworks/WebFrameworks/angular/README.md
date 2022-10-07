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

<div  id="top"></div>

  

<h1  align="center"><%=projectName%></h1>

  

## About The Project

[Angular][Angular-url] is a JavaScript framework that is ideal for creating impressive apps.

It builds on top of standard HTML, CSS & JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

  

## Code scaffolding

  

Run `ng generate component component-name` to generate a new component.

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

  

**Example**: for module generation: `ng generate module module-name --flat --module=app`

`--flat`: Create the new files at the top level of the current project.

`--module`: The declaring NgModule. `Aliases: -m`

  

> [Angular.io/cli/generate][Angular-generate]

  

<div  id="features"></div>

  

## FEATURES:

<ul>

<% if(isAuth0) { %><li><a  href="#auth0"> Auth0 Authentication Service</a></li><%}%>
<% if(isOkta) { %><li><a  href="#okta"> Okta Authentication Service</a></li><%}%>
<% if(isCognito) { %><li>  <a  href="#cognito">Cognito Authentication Service</a></li><%}%>
<% if(isStore) {%><li><a  href="#ngrx"> Ngrx Service</a></li><%}%>
<% if(isThemeProvider) {%><li><a  href="#theme"> Theme Service</a></li><%}%>
<% if (isSMTP) {%><li><a  href="#smtp">SMTP email service</a></li><%}%>
<% if (isSendgrid) {%><li><a  href="#sendgrid">SendGrid email service</a></li><%}%>
<% if (isAmazonSes) {%><li><a  href="#amazonses">AmazonSes email service</a></li><%}%>
<% if (isSentry) {%><li><a  href="#sentry">Sentry logger service </li></a><%}%>
<% if (isWinston) {%><li><a  href="#winston">Winston logger service </li></a><%}%>
<% if (isJest) {%><li><a  href="#jest">Jest test framework </li></a><%}%>
<% if (isCypress) {%><li><a  href="#cypress">Cypress test framework </li></a><%}%>
<% if (isMocha) {%><li><a  href="#mocha">Mocha test framework </li></a><%}%>
<% if (isNightWatch) {%><li><a  href="#nightwatch">Nightwatch test framework </li></a><%}%>
<% if (blobServiceName === 'azure') {%><li><a  href="#azure">Azure blob service </li></a><%}%>
<% if (blobServiceName === 'aws-s3') {%><li><a  href="#aws-s3">AWS-S3 blob service </li></a><%}%>
<% if (isDocker) {%><li><a  href="#docker">Docker</li></a><%}%>
<% if (isNetworkInformer) {%><li><a  href="#networkInformer">Network Informer</li></a><%}%>
<% if (isCICDPipelineIntegrate === "aws") {%><li><a  href="#aws">AWS CI/CD Integration Service</li></a><%}%>

<% if(nodeName) {%>
<% if (dbName === 'postgres') {%><li><a  href="#postgres">POSTGRES db service</a></li><%}%>
<% if (dbName === 'mysql') {%><li><a  href="#mysql">MYSQL db service</a></li><%}%>
<% if (dbName === 'mongoose') {%><li><a  href="#mongoose">MONGOOSE db service</a></li><%}%>
<%}%>

</ul>

### Built with:

<p align-item="left" > 
 
<a  href="https://angular.io"  target="_blank">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"  width="100"  alt="Angularjs" />
</a>
 

<%if(isBootstrap){%>
  
<a  href="https://getbootstrap.com"  target="_blank">
 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg"  alt="bootstrap" max-width="100"  height="100"/>
</a>
<%}%>

<%if(isMaterialUI){%>
  
<a  href="https://mui.com/"  target="_blank">
  <img src="https://v4.mui.com/static/logo_raw.svg"  alt="materialUI"  width="100"  height="100"/>
</a>
<%}%>

<%if(isTailWind){%>
  
<a  href="https://tailwindcss.com/"  target="_blank">
  <img  src="https://tailwindcss.com/_next/static/media/social-square.eab77323.jpg" alt="TailwindCss"  width="100" height="100"/>
</a>
<%}%>

</p>

### Services:

<p  align="left">

<%if(dbName === 'mongoose'){%>
<a  href="https://www.mongodb.com/"  target="_blank"><img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"  alt="mongodb"  width="100"  height="100"/></a>
<%}%>
<%if(dbName === 'mysql'){%><a  href="https://www.mysql.com/"  target="_blank"><img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"  alt="mysql"  width="100"  height="100"/></a>
<%}%>
<%if(dbName === 'postgres'){%><a  href="https://www.postgresql.org"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"  alt="postgresql"  width="100"  height="100"/>  </a>
<%}%>
<a  href="https://karma-runner.github.io/latest/index.html"  target="_blank">  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/karma/karma-original.svg"  alt="Karma"  width="100"  height="100"/>  </a>

<%if(isOkta){%><a  href=https://www.okta.com/  target="_blank"><img  src="https://www.vectorlogo.zone/logos/okta/okta-ar21.svg"  width="100"  alt="okta"  /></a><%}%>
<%if(isAuth0){%><a  href=https://auth0.com/  target="_blank"><img  src="https://www.vectorlogo.zone/logos/auth0/auth0-ar21.svg"  width="100"  alt="auth"  /></a><%}%>
<%if(isCognito){%><a href="https://aws.amazon.com/cognito/"  target="_blank"><img  src="https://miro.medium.com/max/400/1*ZjS_BtHvohZJc6lqHOsdJw.png"  alt="cognito"  height="100"  width="100"/></a>
<%}%>
<%if(isSentry){%><a href="https://sentry.io/welcome/"  target="_blank"><img  src="https://blog.theodo.com/static/63d60039b4d984c7014f2b72544cf46c/ee604/sentry-logo.png"  alt="sentry"  width="100"  height="100"/></a>
<%}%>
<% if (isWinston) {%><a  href="https://www.npmjs.com/package/winston"  target="_blank"><img  src="https://avatars.githubusercontent.com/u/9682013?s=200&v=4"  alt="winston"  width="100"  height="100"/></a>
<%}%>

<p  align="left">

<%if(dbName === 'mongoose'){%>

<a  href="https://www.mongodb.com/"  target="_blank">  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"  alt="mongodb"  width="100"  height="100"/>  
</a>

<%}%>

<%if(dbName === 'mysql'){%>
<a  href="https://www.mysql.com/"  target="_blank">
  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"  alt="mysql"  width="100"  height="100"/>
</a>
<%}%>

<%if(dbName === 'postgres'){%>
<a  href="https://www.postgresql.org"  target="_blank">  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"  alt="postgresql"  width="100"  height="100"/>
</a>
<%}%>

</p>

<%if(blobServiceName === 'azure'){%>

<a  href=https://azure.microsoft.com/en-us/  target="_blank">

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"  width="100"  alt="azure"/>
</a>
<%}%>

<%if(blobServiceName === 'aws-s3'){%>

<a  href=https://aws.amazon.com/s3/  target="_blank">
<img  src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg"  width="100"  alt="aws-s3"/>
</a>

<%}%>
<% if (isCypress) {%>

<a  href="https://www.cypress.io/"  target="_blank">
  <img  src="https://nx.dev/documentation/shared/cypress-logo.png"  alt="cypress"  width="100"  height="80"  />
</a>
<%}%>

<% if (isMocha) {%>

<a  href="https://mochajs.org/"  target="_blank">
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg"  alt="mochajs"  width="100"  height="100"  />
</a>
<%}%>

<% if (isNightWatch) {%>
  
<a  href="https://nightwatchjs.org/"  target="_blank">
 <img  src="https://seeklogo.com/images/N/nightwatchjs-logo-66C5775A1E-seeklogo.com.png"  alt="nightwatch"  width="100"  height="100"  />
</a>
<%}%>

<%if(isJest){%>
<a  href="https://jestjs.io/"  target="_blank">  
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"  alt="jest"  width="100"  height="100"/>
</a>
<%}%>

<%if(isDocker){%>
<a   href="https://www.docker.com/"  target="_blank">
<img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"  alt="docker"  width="100"  height="100"/>  </a> 
<%}%>

## How to run created project:

<% if(nodeName) {%>

Use `npm start` inside <%= frontEndName %> directory to execute the template.
Use <% if(isYarn) {%> `yarn start` <%}else{%> `npm start`<%}%>inside <%= frontEndName %> directory to execute the template.

The command is defined in `package.json`, an example of which is below.

 
```
"scripts": {
  "start": "ng serve"
}
```

Use <% if(isYarn) {%> `yarn start` <%}else{%> `npm start`<%}%> inside <%= nodeName %> directory to execute the backend.
The command is defined in `package.json`, an example of which is below.


```
"scripts": {
  "start": "npm run start-watch",
}
```

  

<%}else{%>


Use <% if(isYarn) {%> `yarn start` <%}else{%> `npm start`<%}%> to execute the template.

The command is defined in `package.json`, an example of which is below.

  

```
"scripts": {
  "start": "ng serve"
}
```

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

  

<% if(isAuth0) {%>

<!----------------------------- Auth0 ----------------------------------------->

<div  id="auth0"></div>

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

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

<% if(isOkta) {%>

<!----------------------------------- Okta -------------------------------------------->

<div  id="okta"></div>  

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

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

<div  id='cognito'></div>

<% if(isCognito) {%>

### Cognito Authentication Service

Cognito is an easy to implement, adaptable authentication and authorization platform.

### Configure environment variables for Cognito

Before running the app, you must update environment variables values in `.env` file.

<% if(nodeName) {%>

Inside `environment` file update environment variables:

```
ANGULAR_APP_AWS_USER_POOLS_ID="your aws user pool id"
ANGULAR_APP_AWS_USER_POOLS_WEB_CLIENT_ID="your aws user pools web client id"
```

<%}%>
You can create your aws account at <a  href="https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start/email">AWS/sign-up</a>

<%}%>
  

<% if(isStore) {%>

<!--------------------------------- Ngrx ------------------------------------------------>

<div  id="ngrx"></div>

  

## Ngrx

RxJS powered state management for Angular applications, inspired by Redux

### @ngrx/store

@ngrx/store is a controlled state container designed to help write performant, consistent applications on top of Angular. Core tenets:

- State is a single immutable data structure

- Actions describe state changes

- Pure functions called reducers take the previous state and the next action to compute the new state

- State accessed with the `Store`, an observable of state and an observer of actions

  

`Package Used`: `@ngrx/store`  `@ngrx/store-devtools`

Important Links: [Docs][Ngrx-docs], [Store][Ngrx-store], [Effect][Ngrx-effect]

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

<% if(isThemeProvider) {%>

<!-------------------------- Theme Provider -------------------------------------------->

<div  id="theme"></div>

## Light and dark mode

A theme toggle button is available in navbar to change style of page from Light to Dark or vice versa, or use the theme toggle component to include the button anywhere you like.

### How to add changes in light and dark mode

```
:root {
  // Light mode variable
  --background-color: #fff;
  --text-color: #121416d8;
  --link-color: #543FD7;

  // Dark mode variables in dark-theme.css
  --dark-background-color: #212A2E;
  --dark-text-color: #F7F8F8;
  --dark-link-color: #828FFF;
}
```

Use the class /id of elements to change the color after theme switched to dark in following way -

Example - 
  Inside dark-theme.css -> 
```
[data-theme='dark'] '(.className/id)' {
  color: var(--dark-text-color);
  background-color: var(--dark-background-color);
}
```
  
**Example :**


|Light Theme                    				|Dark Theme                         				|
|-----------------------------------------------|---------------------------------------------------|
|[data-theme='light'] {							|[data-theme='dark'] {								|
|	background-color: var(--background-color);	|	background-color: var(--dark-background-color); |
|	color: var(--text-color);					|	color: var(--dark-text-color);					|
|}      										|}            										|

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

<% if(isSMTP) {%>

<!---------------------------------- Email service ------------------------------------------->

<div  id='smtp'></div>

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

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

<% if(isSendgrid) {%>

<!---------------------------------- Email service ------------------------------------------->

<div  id='sendgrid'></div>

## Email Services:

### SendGrid email service:

[Twilio SendGrid](https://sendgrid.com/) is an email delivery engine that lets you send emails to leads and customers without maintaining your own email servers. SendGrid handles the technical details of your email strategy–like infrastructure scaling, reputation monitoring, and performance reports.

### Running SendGrid service

To use SendGrid service, go to sendgrid.com and create an account of your choice. After creating acccount get sender's email address verified.

Inside `.env` file in <%= nodeName %> directory update environment variables:
 
```
SENDGRID_API_KEY= Enter Sendgrid Api
```
 
Add recipient's and sender's email id in `to`  `from` fields respectively inside `msg` object in `sendgrid.js` file.

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

<% if(isAmazonSes) {%>

<!---------------------------------- Email service ------------------------------------------->

<div  id='amazonses'></div>

## Email Services:

### AmazonSes email service:

Amazon SES is a cloud email service provider that can integrate into any application for bulk email sending. Whether you send transactional or marketing emails, you pay only for what you use.

### Running AmazonSes service

  To use AmazonSes service: 
  - Go to https://aws.amazon.com/ and create /login to your aws account
  - Search for Simple Email Service in your preferred AWS region.  
  - On the SES homepage, click on the “Email Addresses” option from the sidebar on the left.
  - Add the email you want to use for sending an email. You will receive an email from  `no-reply-aws@amazon.com`  to verify the email. Click on the URL in the mail to verify (your verified email address will be used as the ‘from’ address for the emails you send using AWS-SES).

Inside `.env` file in <%= nodeName %> directory update environment variables:

```
AWS_ACCESS_KEY_ID = Enter your Aws Access Key Id
AWS_SECRET_ACCESS_KEY = Enter Your Aws Secret Access Key
AWS_REGION = Enter Your Aws Region
```

Now, add recipient's and sender's email id in `to`  `from` fields respectively inside `mailParams` object in `controllers.js` file.

<p align="right">(<a  href="#features">back to features</a>)</p>

<%}%>
<div  id='azure'/>  

<% if(blobServiceName === 'azure') {%>

### Blob Service

### Azure blob service

Azure Blob storage is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data.

### Running Azure blob service


Inside `.env` file in <%= nodeName %> directory update environment variables:

```
AZURE_STORAGE_CONNECTION_STRING = Enter your Azure Storege Connection String
```

### Azure blob service functions

<ul>
<li> createContainer - To create a container.</li>
<li> listContainers - To list all containers.</li>
<li> deleteContainer - To delete a container.</li>
<li> uploadBlob - To upload any type of file.</li>
<li> listBLobs - To list all files in container.</li>
<li> downloadBlob - To download file from container.</li>
<li> deleteBlob - To delete file from container.</li>
<li> sampleBlobServiceExecutor - To test all functionalities of azure blob service.</li>
</ul>

<%}%>

<div  id="aws-s3"></div

<% if(blobServiceName === 'aws-s3') {%>

### Blob Service

### AWS-S3 blob service

Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security.

### Running AWS-S3 blob service

Inside `.env` file in <%= nodeName %> directory update environment variables:

```
AWS_ACCESS_KEY_ID = Enter your Aws Access Key Id
AWS_SECRET_ACCESS_KEY = Enter your Aws Secret Access Key
AWS_REGION = Enter your Aws Region
```

### AWS-S3 blob service functions

<ul>
<li> createBucket - To create a bucket.</li>
<li> listBuckets - To list all buckets.</li>
<li> deleteBucket - To delete a bucket.</li>
<li> uploadObject - To upload an object in bucket.</li>
<li> listObjects - To list all objects in bucket.</li>
<li> downloadObject - To download an object from bucket.</li>
<li> deleteObject - To delete object from bucket.</li>
<li> sampleAwsS3Executor - To test all functionalities of aws-s3 blob service.</li>
</ul>

<%}%>


<div  id="sentry"></div>
<% if(isSentry) {%>

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

  <div  id="winston"></div>
 
### Winston Logger service

`winston` is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each `winston` logger can have multiple transports configured at different levels.

```
For winston there are no credentials required as the log is created in a log file which gets generated when you run the app.
```

<%}%>
  


<div  id='postgres'></div>

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

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

  

<div  id='mongoose'></div>

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

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%> 


<div  id='networkInformer'/>

<% if(isNetworkInformer) {%>

### Network Informer Service

Network informer displays network status on top of your app when you are offline and online.

<%}%>

<div  id='docker'/>

<% if(isDocker) {%>



### Docker Service
Docker is a software platform that allows you to build, test, and deploy applications quickly. Docker packages software into standardized units called containers that have everything the software needs to run including libraries, system tools, code, and runtime.

You can install docker from here :  <a  href="https://docs.docker.com/engine/install/"> Install docker</a>


Run command in terminal :
```
docker compose up
```

<%}%>


<div  id='aws'/>


<% if(isCICDPipelineIntegrate === "aws") {%>


### AWS CI/CD  Integration Service

AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates.

Create a bucket in your aws account.

You can create your  aws account here: <a  href="https://aws.amazon.com/"> AWS account</a>

Update environment variables in `build.yml` file:

```
env:
# Region
AWS_REGION: Enter Region
# S3-bucket name
S3_BUCKET: Enter your Bucket Name
```

<%}%>


<div  id='mysql'></div>

<!------------------------------------- My Sql ----------------------------------------->

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

<p  align="right">(<a  href="#features">back to features</a>)</p>

<%}%>

<div  id='jest'/>

<% if(isJest) {%>


### Testing:

### JEST test framework

Jest is a universal testing platform, with the ability to adapt to any JavaScript library or framework.

### Running Jest

<% if(isYarn) {%> 
```
yarn run test
```
<%}else{%> 
```
npm run test
```

<%}%>
<%}%>

  

<div  id="cypress"></div>

<% if(isCypress) {%>  

### Testing:

### Cypress test framework

Cypress is a next generation front end testing tool built for the modern web. Fast, easy and reliable testing for anything that runs in a browser.


### Running Cypress

Before running the test, update `BASE_URL` constant as your app base url in `cypress.constants.js` file and you need to run the project.

  
```
npx cypress open
```

<%}%>

<div  id="mocha"></div>

<% if(isMocha) {%>

### Testing:

### Mocha test framework

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.

### Running Mocha

<% if(isYarn) {%> 
```
yarn run test
```
<%}else{%>
```
npm test
```

<%}%>
<%}%>
  

<div  id='nightwatch'/>

<% if(isNightWatch) {%>

### Testing:

### Nightwatch test framework

Nightwatch is a next generation front end testing tool built for the modern web. Fast, easy and reliable testing for anything that runs in a browser.  

### Running Nightwatch

Before running the test, update `BASE_URL` constant as your app base url in `nightwatch.config.js` file and you need to run the project.

<% if(isYarn) {%> 

```
yarn run test
```
<%}else{%> 
```
npm run test
```
<%}%>
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

<a  href="[Innostax]([Innostax])"> Innostax Software Labs</p>

<p  align="right">(<a  href="#top">back to top</a>)</p>

  

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

  

<!-- Backend -->

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
