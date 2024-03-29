<% if (isSentry) { %>
  const Sentry = require('../utils/logger')
  <% } %>

<% if (isWinston) { %>
  const logger = require('../utils/logger')
  <% } %>
     
<% if (isMongoose) { %>
const <%= defaultRoute %> = require("../models/<%- defaultRoute %>.js");
    <% } %>

    <% if(isSMTP) {%>
      require('dotenv').config()
      const smtp = require('../utils/email/smtp')
      <%}%> 
    <% if(isSendgrid) {%>
      require('dotenv').config()
      const { sendMail } = require('../utils/email/sendgrid')
      <%}%>
    <%if (isAmazonSes) {%>
      const { sendMail } = require('../utils/email/amazon_ses')
      <%}%>  

 <% if(isSequelize) {%> 
  const { <%= defaultRoute %> } = require("../sequelize")
  <%}%>
  const find = (req, res, next) => {
    <% if(isMongoose){ %>
      const projection = { id: '$_id', _id: 0, name: 1, username: 1, email: 1 }
        <%= defaultRoute %>.find({},projection,function(err, data){
            if (!err) {
              res.send(data);
            } else {
              res.send(err);
            }
          })
      <% } %>
      <% if(isSequelize){%>
        <%= defaultRoute %>.findAll().then((<%= defaultRoute %>) => res.json(<%= defaultRoute %>));
        <%}%>
      <% if(!(isSequelize || isMongoose)){ %>  
        res.send('find called');
     <% } %>

  }
  
  const create = async(req, res, next) => {

    <% if(isSMTP) {%>
      const USERNAME = process.env.SMTP_USERNAME
      const mailObj = {
        from: USERNAME,
        recipients: [`${req.body.email}`],  //Enter the Recipient's mail Id
        subject: 'Sending email by nodejs',
        message: 'Hello World;',
        html: '<h1></h1>'
      }
    
      await smtp.sendEmail(mailObj).then((res) => {
        console.log('email response', res)
      })
    <%}%>

    <% if(isSendgrid) {%>
      sendMail();
    <%}%>

    <%if (isAmazonSes) {%>
      const mailParams = {
        to: ["Recipients Email"],
        from: "Sender Email",
        subject: "Subject",
        html: "htmlMessage",
        text: "textMessage",
      }
      sendMail(mailParams)
      <% } %>  

    <% if(isMongoose){ %>
        const newData = new <%= defaultRoute %>({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
          });
          newData.save(function(err,data){
            if (!err){ 
             const projection = { id: '$_id', _id: 0, name: 1, username: 1, email: 1 } 
              <%= defaultRoute %>.findOne({ _id: data._id }, projection, function (err, data) {
				if (!err) {
					res.send(data)
				} else {
					res.send(err)
				}
			})
            } else {
              res.send(err);
            }
          });
      <%}%>
      <% if(isSequelize){%>
        <%= defaultRoute %>.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.send("User cannot be created"))
        <%}%>
      <% if(!(isSequelize || isMongoose)){ %> 
        res.send('create  Called')
     <% } %>
  }
  
  const patch =(req, res, next) => {
    <% if(isMongoose){ %>
        <%= defaultRoute %>.updateOne(
          {_id: req.params.id},
          {$set: req.body},
          function(err,data){
            if(!err){
              <%= defaultRoute %>.findOne({id: req.params.id},function(err, data){
                if (data) {
                  res.send(data);
                } else {
                  res.send("No Matching found");
                }
              })
            } else {
              res.send(err);
            }
          }
          );
      <% } %>
      <% if(isSequelize){%>
        <%= defaultRoute %>.update(
          { name:req.body.name,
          username:req.body.username,
          email:req.body.email},
          { where:
              { id: req.params.id},
              returning:true, plain:true
          }
      )<%if(dbName==="postgres") { %>.then((<%= defaultRoute %>) => {
        if (<%= defaultRoute %>[1]) res.send('<%= defaultRoute %> updated')
        else res.send("<%= defaultRoute %> with this ID can't be found")
      }
    ); <%}%> <%if(dbName==="mysql") { %>
      <%= defaultRoute %>.findAll({
        where:{
            id:req.params.id
        }
    }).then((<%= defaultRoute %>) => res.json(<%= defaultRoute %>));
    <%}%>
        <%}%>
      <% if(!(isSequelize || isMongoose)) { %>  
        res.send('patch Called')
     <% } %>  
  }
  
  const remove =(req, res, next) => {
    <% if(isMongoose){ %>
        <%= defaultRoute %>.deleteMany(function(err){
            if(!err) res.send('All deleted')
            else res.send(err)
        })
      <% }%>
      <% if(isSequelize) {%>
        <%= defaultRoute %>.destroy({
          truncate : true
       })
       .then(() => {
        res.send('<%= defaultRoute %> updated')
       });
       <%}%>
       <% if(!(isSequelize || isMongoose)){ %>  
        res.send('remove Called')
     <% } %>
  }
  
  const removeById =(req, res, next) => {
    <% if(isMongoose){ %>
        <%= defaultRoute %>.deleteOne({_id: req.params.id}, function(err, data){
          if (data) {
              if (!err) {
                res.send(data);
              } else {
                res.send(err);
              } 
          } else {
            res.send("No matching  was found.");
          }
          });
      <% }%>
      <% if(isSequelize) {%>
        <%= defaultRoute %>.destroy({
          where: {
              id: req.params.id
          },
          returning: true,checkExistance: true,
      }).then((<%= defaultRoute %>) => {
        if (<%= defaultRoute %>) res.send("user deleted");
        else res.send("User with this ID can't be found");
      });
        <%}%> 
      <% if(!(isSequelize || isMongoose)){ %>  
        res.send('remove by id Called')
     <% } %>
    
  }
  
  const findById = (req, res, next ) => {
    <% if(isMongoose){ %>
        <%= defaultRoute %>.findOne({_id: req.params.id}, function(err, data){
            if (data) {
              res.send(data);
            } else {
              res.send("No matching found.");
            }
          });
      <% } %>
      <% if(isSequelize) {%>
        <%= defaultRoute %>.findAll({
          where:{
              id:req.params.id
          }
      }).then((<%= defaultRoute %>) => res.json(<%= defaultRoute %>));
        <%}%>
      <% if(!(isSequelize || isMongoose)){ %>  
        res.send('find by id Called')
     <% } %>
    
  }
  <% if (isSentry || isWinston) { %>
      const testlogger=(req, res, next ) => {
        <% if (isSentry) { %>
          Sentry.captureMessage("Sentry is running...");
          res.send('Sentry is running...')
          <% } %>
        
        <% if (isWinston) { %>
          logger.info("Winston is running...");
          res.send('Winston is running...')
          <% } %>
      }
  <% } %>
  
  module.exports = {
      find,
      create,
      patch,
      remove,
      findById,
      removeById,
      <% if (isSentry || isWinston) {%>testlogger<%} %>
    };
