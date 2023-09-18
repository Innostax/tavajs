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

Vue is a JavaScript framework that is ideal for creating impressive apps.

It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.

### FEATURES:

<ul>

<% if(isAuth0) { %><li><a href="#auth0"> Auth0 Authentication Service</a></li><%}%>
<% if(isOkta) { %><li> <a href="#okta">Okta Authentication Service</a></li><%}%>
<% if(isCognito) { %><li> <a href="#cognito">Cognito Authentication Service</a></li><%}%>
<% if(isStore) {%><li><a href="#vuex"> Vuex Service </a></li><%}%>
<% if(isThemeProvider) {%><li> <a href="#themeService">Theme Service</a></li><%}%>
<% if(nodeName) {%>
<% if (dbName === 'postgres'){%><li><a href="#postgres"> POSTGRES db service </a></li><%}%>
<% if (dbName === 'mysql') {%><li><a href="#mysql">MYSQL db service </li></a><%}%>
<% if (dbName === 'mongoose') {%><li><a href="#mongoose">MONGOOSE db service </li></a><%}%>
<%}%>
<% if (isSMTP) {%><li><a href="#smtp">SMTP email service </li></a><%}%>
<% if (isSendgrid) {%><li><a  href="#sendgrid">SendGrid email service</a></li><%}%>
<% if (isAmazonSes) {%><li><a href="#amazon-ses">Amazon SES email service </li></a><%}%>
<% if (isSentry) {%><li><a  href="#sentry">Sentry logger service </li></a><%}%>
<% if (isWinston) {%><li><a  href="#winston">Winston logger service </li></a><%}%>
<% if (isJest) {%><li><a href="#jest">Jest test framework </li></a><%}%>
<% if (isCypress) {%><li><a href="#cypress">Cypress test framework </li></a><%}%>
<% if (isMocha) {%><li><a href="#mocha">Mocha test framework </li></a><%}%>
<% if (isNightWatch) {%><li><a href="#nightwatch">Nightwatch test framework </li></a><%}%>
<% if (blobServiceName === 'azure') {%><li><a  href="#azure">Azure blob service </li></a><%}%>
<% if (blobServiceName === 'aws-s3') {%><li><a  href="#aws-s3">AWS-S3 blob service </li></a><%}%>
<% if (isDocker) {%><li><a  href="#docker">Docker</li></a><%}%>
<% if (isNetworkInformer) {%><li><a  href="#networkInformer">Network Informer</li></a><%}%>
<% if (isCICDPipelineIntegrate === "aws") {%><li><a  href="#aws">AWS CI/CD Integration Service</li></a><%}%>
</ul>

### Built with:

<p align-item="left" >

<%if(nodeName){%><a  href="https://nodejs.org"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"  alt="nodejs"  width="100"  height="100"/>  </a>
<%}%> 

<a  href=https://vuejs.org/ target="_blank">  
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original-wordmark.svg" width="100" alt="vue" />
</a>

 <%if(isBootstrap){%>
  
<a  href="https://getbootstrap.com"  target="_blank">
 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg"  alt="bootstrap" max-width="100"  height="100"/>
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
<a  href="https://www.mongodb.com/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"  alt="mongodb"  width="100"  height="100"/>  </a>  
<%}%>
<%if(dbName === 'mysql'){%>
<a  href="https://www.mysql.com/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"  alt="mysql"  width="100"  height="100"/>  </a> 
<%}%> 
<%if(dbName === 'postgres'){%>
<a  href="https://www.postgresql.org"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"  alt="postgresql"  width="100"  height="100"/>  </a>
<%}%>
<% if (isSentry) {%>
<a  href="https://sentry.io/welcome/"  target="_blank">  <img  src="https://blog.theodo.com/static/63d60039b4d984c7014f2b72544cf46c/ee604/sentry-logo.png"  alt="sentry"  width="100"  height="100"/>  </a>
<%}%>
<% if (isWinston) {%>
<a  href="https://www.npmjs.com/package/winston"  target="_blank">  <img  src="https://avatars.githubusercontent.com/u/9682013?s=200&v=4"  alt="winston"  width="100"  height="100"/>  </a>
<%}%>
<% if (isCypress) {%>
<a  href="https://www.cypress.io/" target="_blank"><img src="https://i.ibb.co/sPgXBFJ/cypress.png" alt="cypress" width="100" height="80" /></a>
<%}%>
<% if (isMocha) {%>
<a  href="https://mochajs.org/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" alt="mochajs"  width="100"  height="100" /></a>
<%}%>
<% if (isNightWatch) {%>
<a  href="https://nightwatchjs.org/" target="_blank"><img src="https://seeklogo.com/images/N/nightwatchjs-logo-66C5775A1E-seeklogo.com.png" alt="nightwatch"  width="100"  height="100" /></a>
<%}%>
<%if(isJest){%>
<a  href="https://jestjs.io/"  target="_blank">  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"  alt="jest"  width="100"  height="100"/>  </a>
<%}%>
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
<%if(isCognito){%>
<a href="https://aws.amazon.com/cognito/" target="_blank">
<img src="https://miro.medium.com/max/400/1*ZjS_BtHvohZJc6lqHOsdJw.png" alt="cognito" height="100" width="100"/></a>
<%}%>
<%if(isSMTP){%>
<a  href="https://www.smtp.com/" target="_blank"><img src="https://www.postmastery.com/wp-content/uploads/2018/05/smtp.jpg" alt="smtp" width="150" height="80" /></a>
<%}%>
<% if (isSendgrid) {%>
  <a  href="https://sendgrid.com/" target="_blank"><img src="https://sendgrid.com/wp-content/themes/sgdotcom/pages/resource/brand/2016/SendGrid-Logomark.png" alt="sendgrid" width="100" height="100" /></a>
<%}%>
<%if(isAmazonSes){%>
 <a  href="https://aws.amazon.com/ses/" target="_blank"><img src="https://www.shareicon.net/data/512x512/2015/08/28/92163_copy_512x512.png" alt="amazon_ses" width="100" height="100" />
<%}%>
<%if(blobServiceName === 'azure'){%>
<a  href=https://azure.microsoft.com/en-us/  target="_blank">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" width="100"  alt="azure"/>
 </a>
<%}%>
<%if(blobServiceName === 'aws-s3'){%>
<a  href=https://aws.amazon.com/s3/ target="_blank">
 <img src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" width="100"  alt="aws-s3"/>
 </a>
<%}%>
<%if(isDocker){%>
<a   href="https://www.docker.com/"  target="_blank">  <img  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"  alt="docker"  width="100"  height="100"/>  </a> 
<%}%>

### How to run created project :

<% if(nodeName) {%>
Use <% if(isYarn) {%> `yarn run serve` <%}else{%> `npm run serve`<%}%>inside <%= frontEndName %> directory to execute the template.

The command is defined in `package.json`, an example of which is below.

```
"scripts": {
"serve": "vue-cli-service serve",
}
```

Use <% if(isYarn) {%> `yarn start` <%}else{%> `npm start`<%}%> inside <%= nodeName %> directory to execute the backend.

<%}else{%>
Use <% if(isYarn) {%> `yarn run serve` <%}else{%> `npm run serve`<%}%> to execute the template.

The command is defined in `package.json`, an example of which is below.

```
"scripts": {
"serve": "vue-cli-service serve",
}
```
<%}%>


<% if(isAuth0) {%>
<div id='auth0'/>
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
VUE_APP_AUTH0_CLIENT_ID=your auth0 client Id
VUE_APP_AUTH0_DOMAIN=your Auth0 Domain
```
<%}else{%>
Inside `.env` file update environment variables:

```
VUE_APP_AUTH0_CLIENT_ID=your auth0 client Id
VUE_APP_AUTH0_DOMAIN=your Auth0 Domain
```

<%}%>

You can create your Auth0 account at <a  href="https://auth0.com/signup">Auth0/sign-up</a>
<%}%>

<% if(isCognito) {%>
<div id='cognito'/>

### Cognito Authentication Service

Cognito is an easy to implement, adaptable authentication and authorization platform.

### Configure environment variables for Cognito

Before running the app, you must update environment variables values in `.env` file.

<% if(nodeName) {%>
Inside `.env` file in <%= frontEndName %> directory update environment variables:  

```
VUE_APP_AWS_USER_POOLS_ID="your aws user pool id"
VUE_APP_AWS_USER_POOLS_WEB_CLIENT_ID="your aws user pools web client id"
```
<%}else{%>
Inside `.env` file update environment variables:

```
VUE_APP_AWS_USER_POOLS_ID="your aws user pool id"
VUE_APP_AWS_USER_POOLS_WEB_CLIENT_ID="your aws user pools web client id"
```

<%}%>

You can create your aws account at <a  href="https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start/email">AWS/sign-up</a>
<%}%>


<% if(isOkta) {%>
<div id='okta'/>

### Okta Authentication Service

Okta is an easy to implement, adaptable authentication and authorization platform.

### Configure environment variables for Okta

Before running the app, you must update environment variables values in `.env` file.

Inside `.env` file update environment variables:

```
VUE_APP_OKTA_CLIENT_ID=your auth0 client Id 
VUE_APP_OKTA_ISSUER=your Auth0 Domain
```

You can create your Okta account at <a  href="https://developer.okta.com/signup/">Okta/sign-up</a>

<%}%>

<% if(dbName === 'postgres') {%>
<div id='postgres'/>

### Postgres Database Service

PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

### Configure environment variables for Postgres

Before running the app, inside `.env` file in <%= nodeName %> directory update environment variable for postgres:

```
DATABASE_URL=<%= dbName %>://username:password@localhost:5432/postgres
```

Update `username` and `password` for `DATABASE_URL` environment variable.
<%}%>

<% if(dbName === 'mongoose') {%>
<div id='mongoose'/>

### Mongoose Database Service

MongoDB is one of the most widely used No-SQL databases in the developer world today.

### Configure environment variables for Mongoose

Before running the app, inside `.env` file in <%= nodeName %> directory update environment variable for mongoose:

```
DATABASE_URL=mongodb://localhost:27017/admin 
```

Update the `DATABASE_URL` environment variable.
<%}%>

<% if(dbName === 'mysql') {%>
<div id='mysql'/>

### MYSQL Database Service

MySQL is the world's most popular open source database. With its proven performance, reliability and ease-of-use, MySQL has become the leading database choice for web-based applications.

### Configure environment variables for MYSQL

Before running the app, inside `.env` file in <%= nodeName %> directory update environment variable for MYSQL:


```
DATABASE_URL=mysql://username:password@localhost:3306/mydb
```

Update `username` , `password` and `mydb` for `DATABASE_URL` environment variable as your username, password and database name.
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

### Logger Service:


### Winston Logger service

`winston` is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each `winston` logger can have multiple transports configured at different levels.

```

For winston there are no credentials required as the log is created in a log file which gets generated when you run the app.

```
<%}%>

<% if(isJest) {%>
<div id='jest'/>
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

<% if(isCypress) {%>
<div id='cypress'/>

### Testing:

### Cypress test framework
Cypress is a next generation front end testing tool built for the modern web. Fast, easy and reliable testing for anything that runs in a browser.

### Running Cypress
Before running the test, update `BASE_URL` constant as your app base url in `cypress.constants.js` file and you need to run the project.

```
npx cypress open
```
<%}%>

<% if(isMocha) {%>

<div id='mocha'/>

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
npm run test
```
npm run test
```
<%}%>
<%}%>
<%}%>

<% if(isNightWatch) {%>
<div id='nightwatch'/>

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

<% if(isSMTP) {%>
<div id='smtp'/>

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
<div id='amazon-ses'/>

### Email Service:

### Amazon SES email service

Amazon Simple Email Service (Amazon SES) is a bulk and transactional email-sending service. It is the most cost effective email marketing platform.

### Running Amazon SES email service

Inside `.env` file in <%= nodeName %> directory update environment variables:

```
AWS_ACCESS_KEY_ID = Enter your Aws Access Key Id
AWS_SECRET_ACCESS_KEY = Enter Your Aws Secret Access Key
AWS_REGION = Enter Your Aws Region
```
Pass the following information inside `mailParams` data property in `index.js` file.

```
{	
to: ["Recipients Email"],	
from: "Sender Email",	
subject: "Subject",	
html: "htmlMessage",	
text: "textMessage",
}
```

<%}%>


<% if(blobServiceName === 'azure') {%>
<div  id='azure'/>

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

<% if(blobServiceName === 'aws-s3') {%>
<div  id='aws-s3'/>
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

<% if(isThemeProvider) {%>
<div id='themeService'/>

### Light and dark mode

A VueJs-based switch to change style of page from Light to Dark or vice versa.

### How to add changes in light and dark mode

Use app.css file for any changes in light and dark mode.

Add or edit style by using class_name used in components.

example:

```
body {

background: var(--secondaryBackgroundColor);

color: var(--headingTextColor);

}
```

<%}%>


<% if(isNetworkInformer) {%>
<div  id='networkInformer'/>

### Network Informer Service

Network informer displays network status on top of your app when you are offline and online.

<%}%>

<% if(isDocker) {%>

<div  id='docker'/>
  

### Docker Service
Docker is a software platform that allows you to build, test, and deploy applications quickly. Docker packages software into standardized units called containers that have everything the software needs to run including libraries, system tools, code, and runtime.

You can install docker from here :  <a  href="https://docs.docker.com/engine/install/"> Install docker</a>


Run command in terminal :
```

docker compose up

```

<%}%>

<% if(isCICDPipelineIntegrate === "aws") {%>

<div  id='aws'/>
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


## Some Important Links

Official Documentation: <a  href="https://vuejs.org/guide/introduction.html"> Vue.js</a>

Built-In directives: <a  href="https://vuejs.org/api/built-in-directives.html#built-in-directives"> vuejs.org/guide/directives</a>

Template overview: <a  href="https://vuejs.org/guide/essentials/template-syntax.html"> vuejs.org/guide/template</a>

---

## License

Copyright (C)2021 Innostax
Licensed under the MIT License.

## Contact 

<a  href="https://innostax.com/"> Innostax Software Labs</a>
<p  align="right">(<a  href="#top">back to top</a>)</p>
