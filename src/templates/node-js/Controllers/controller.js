<% if (mongoSelected) { %>
const <%= defaultRoute %> = require("../Models/<%- defaultRoute %>.js");
    <% } %>
 <% if(sequelizeSelected) {%> 
  const { <%= defaultRoute %> } = require("../sequelize")
  <%}%>
  const find = (req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.find(function(err, data){
            if (!err) {
              res.send(data);
            } else {
              res.send(err);
            }
          })
      <% } %>
      <% if(sequelizeSelected){%>
        <%= defaultRoute %>.findAll().then((<%= defaultRoute %>) => {
          if (<%= defaultRoute %>.length > 0) res.json(<%= defaultRoute %>);
          else res.send("no user found");
        });
        <%}%>
      <% if(!(sequelizeSelected || mongoSelected)){ %>  
        res.send('find called');
     <% } %>

  }
  
  const create =(req, res, next) => {
    <% if(mongoSelected){ %>
        const newData = new <%= defaultRoute %>({
            name: req.body.name,
            username: req.body.username,
            email:req.body.email
          });
          newData.save(function(err,data){
            if (!err){  
              res.send(data);
            } else {
              res.send(err);
            }
          });
      <%}%>
      <% if(sequelizeSelected){%>
        <%= defaultRoute %>.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.send("User cannot be created"))
        <%}%>
      <% if(!(sequelizeSelected || mongoSelected)){ %> 
        res.send('create  Called')
     <% } %>
     
  }
  
  const patch =(req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.updateOne(
          {_id: req.params.id},
          {$set: req.body},
          function(err,data){
            if(!err){
              users.find(function(err, data){
                if (!err) {
                  res.send(data);
                } else {
                  res.send(err);
                }
              })
            } else {
              res.send(err);
            }
          }
          );
      <% } %>
      <% if(sequelizeSelected){%>
        <%= defaultRoute %>.update(
          { name:req.body.name,
          phone_number:req.body.phone_number},
          { where:
              { id: req.params.id}
          }
      ).then((<%= defaultRoute %>) => {
        if (<%= defaultRoute %>[0]) res.send("User updated");
        else res.send("User with this ID can't be updated");
      }
    );
        <%}%>
      <% if(!(sequelizeSelected || mongoSelected)) { %>  
        res.send('patch Called')
     <% } %>  
  }
  
  const remove =(req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.deleteMany(function(err){
            if(!err) res.send('All deleted')
            else res.send(err)
        })
      <% }%>
      <% if(sequelizeSelected) {%>
        <%= defaultRoute %>.destroy({
          truncate : true
       });
       <%}%>
       <% if(!(sequelizeSelected || mongoSelected)){ %>  
        res.send('remove Called')
     <% } %>
  }
  
  const removeById =(req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.deleteOne({_id: req.params.id}, function(err, data){
          if (data) {
            users.find(function(err, data){
              if (!err) {
                res.send(data);
              } else {
                res.send(err);
              }
            })
          } else {
            res.send("No matching  was found.");
          }
          });
      <% }%>
      <% if(sequelizeSelected) {%>
        <%= defaultRoute %>.destroy({
          where: {
              id: req.params.id
          }
      }).then((<%= defaultRoute %>) => {
        if (<%= defaultRoute %>) res.send("user deleted");
        else res.send("User with this ID can't be found");
      });
        <%}%> 
      <% if(!(sequelizeSelected || mongoSelected)){ %>  
        res.send('remove by id Called')
     <% } %>
    
  }
  
  const findById = (req, res, next ) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.findOne({_id: req.params.id}, function(err, data){
            if (data) {
              res.send(data);
            } else {
              res.send("No matching found.");
            }
          });
      <% } %>
      <% if(sequelizeSelected) {%>
        <%= defaultRoute %>.findAll({
          where:{
              id:req.params.id
          }
      }).then((<%= defaultRoute %>) => {
        if (<%= defaultRoute %> > 0) res.json(users);
        else res.send("no user found");
      });
        <%}%>
      <% if(!(sequelizeSelected || mongoSelected)){ %>  
        res.send('find by id Called')
     <% } %>
    
  }
  
  module.exports = {
      find,
      create,
      patch,
      remove,
      findById,
      removeById
    };