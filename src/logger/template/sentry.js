const express = require('express')
const app = express()
app.use(express.json());
const port =3000
const fs = require('fs')
var Raven = require("raven");
Raven.config({ dsn: "https://examplePublicKey@o0.ingest.sentry.io/0" });

app.get('/',(req,res)=>{
    try{
    res.end('Hello');
}catch(e){
    Raven.captureException(e);
}
});

app.get("/<%= defaultRoute %>",(req,res)=>{
    try{
        res.send(users);
    }catch(e){
        Raven.captureException(e);
    }   
});
app.post("/<%= defaultRoute %>",(req,res)=>{
   try{
        const User={
        id : users.length+1,
        name: req.body.name,
        username:req.body.username,
        email:req.body.email
    };
    users.push(User)
    res.send(User)
}catch(e){
    Raven.captureException(e);
}
})

app.get("/<%= defaultRoute %>/:id",(req,res)=>{
    try{
    const user=users.find(user => user.id === parseInt(req.params.id));
    if(!user) res.status(404).send('The user with given Id was not found');
    res.send(user);
    }catch(e){
        Raven.captureException(e);
    }
})
app.put("/<%= defaultRoute %>/:id",(req,res)=>{
    try{
        const user=users.find(user => user.id === parseInt(req.params.id));
    if(!user) res.status(404).send('The user with given Id was not found');
    user.name=req.body.name;
    user.username=req.body.username;
    user.email=req.body.email;
    res.send(user);
}catch(e){
    Raven.captureException(e);
}
})

app.delete("/<%= defaultRoute %>/:id",(req,res)=>{
    try{
    const user=users.find(user => user.id === parseInt(req.params.id));
    if(!user) res.status(404).send('The user with given Id was not found');
    const index = users.indexOf(user);
    users.splice(index,1);
    res.send(users);
}catch(e){
    Raven.captureException(e);
}
})

app.listen(port,()=>{
    console.log('app listening')
})