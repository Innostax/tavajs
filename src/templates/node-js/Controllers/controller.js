<% if (mongoSelected) { %>
const <%= defaultRoute %> = require("../Models/<%- defaultRoute %>.js");
    <% } %>
 <% if(sequelizeSelected) {%> 
  const { <%= defaultRoute %> } = require("../sequelize")
  <%}%>
  const users = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    }
  ];

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
        <%= defaultRoute %>.findAll().then((users) => {
          if (users.length > 0) res.json(users);
          else res.send("no user found");
        });
        <%}%>
      <% if(!(sequelizeSelected || mongoSelected)){ %>  
        res.send(users);
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
      <%}%>
      <% if(sequelizeSelected){%>
        <%= defaultRoute %>.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.send("User cannot be created"))
        <%}%>
      <% if(!(sequelizeSelected || mongoSelected)){ %> 
        const User = {
          id: req.body.nextUserId,
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
        };
        users.push(User);
        res.send(User);
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
      <% } %>
      <% if(sequelizeSelected){%>
        <%= defaultRoute %>.update(
          { name:req.body.name,
          phone_number:req.body.phone_number},
          { where:
              { id: req.params.id}
          }
      ).then((users) => {
        if (users[0]) res.send("User updated");
        else res.send("User with this ID can't be updated");
      }
    );
        <%}%>
      <% if(!(sequelizeSelected || mongoSelected)) { %>  
        const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user with given Id was not found");
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  res.send(user);
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
              res.send(data);
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
      }).then((users) => {
        if (users) res.send("user deleted");
        else res.send("User with this ID can't be found");
      });
        <%}%> 
      <% if(!(sequelizeSelected || mongoSelected)){ %>  
        const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user with given Id was not found");
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(users);
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
      }).then((users) => {
        if (users.length > 0) res.json(users);
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