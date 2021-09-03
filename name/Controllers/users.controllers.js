const User = require("../Models/users.js");

const find = (req, res, next) => {
    User.find(function(err, users){
        if (!err) {
          res.send(users);
        } else {
          res.send(err);
        }
      });
}

const create =(req, res, next) => {
    const newUser = new User({
        _id: req.body.id,
        name: req.body.name,
        phone_number: req.body.phone_number
      });
      newUser.save(function(err){
          console.log('entered')
          console.log(err)
        if (!err){
          console.log('enetered if')  
          res.send("Successfully added a new article.");
        } else {
          res.send(err);
        }
      });
}

const patch =(req, res, next) => {
    User.updateOne(
        {_id: req.params.id},
        {$set: req.body},
        function(err){
          if(!err){
            res.send("Successfully updated user.");
          } else {
            res.send(err);
          }
        }
      );
}

const remove =(req, res, next) => {
    User.deleteMany(function(err){
        if(!err) res.send('All Users deleted')
        else res.send(err)
    })
}

const removeById =(req, res, next) => {
    User.deleteOne({_id: req.params.id}, function(err, deleteUser){
        if (deleteUser) {
          res.send(deleteUser);
        } else {
          res.send("No Users matching that title was found.");
        }
      });
}

const findById = (req, res, next ) => {
    User.findOne({_id: req.params.id}, function(err, foundUser){
        if (foundUser) {
          res.send(foundUser);
        } else {
          res.send("No Users matching that title was found.");
        }
      });

}

module.exports = {
    find,
    create,
    patch,
    remove,
    findById,
    removeById
  };
