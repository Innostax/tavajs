<% if (mongoSelected) { %>
const <%= defaultRoute %> = require("../Models/<%- defaultRoute %>.js");
    <% } %>
 
  const find = (req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.find(function(err, data){
            if (!err) {
              res.send(data);
            } else {
              res.send(err);
            }
          })
      <% } else{ %>  
        res.send('find Called')
     <% } %>

  }
  
  const create =(req, res, next) => {
    <% if(mongoSelected){ %>
        const newData = new <%= defaultRoute %>({
            _id: req.body.id,
            name: req.body.name,
            phone_number: req.body.phone_number
          });
          newData.save(function(err){
            if (!err){  
              res.send("Successfully added");
            } else {
              res.send(err);
            }
          });
      <% } else{ %>  
        res.send('create  Called')
     <% } %>
     
  }
  
  const patch =(req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.updateOne(
            {_id: req.params.id},
            {$set: req.body},
            function(err){
              if(!err){
                res.send("Successfully updated.");
              } else {
                res.send(err);
              }
            }
          );
      <% } else{ %>  
        res.send('patch Called')  
     <% } %>  
  }
  
  const remove =(req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.deleteMany(function(err){
            if(!err) res.send('All deleted')
            else res.send(err)
        })
      <% } else{ %>  
        res.send('remove Called')
     <% } %>
  }
  
  const removeById =(req, res, next) => {
    <% if(mongoSelected){ %>
        <%= defaultRoute %>.deleteOne({_id: req.params.id}, function(err, data){
            if (data) {
              res.send(data);
            } else {
              res.send("No matching  was found.");
            }
          });
      <% } else{ %>  
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
      <% } else{ %>  
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