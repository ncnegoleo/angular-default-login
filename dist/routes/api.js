/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();

var users = [{
    firstName: "leonardo",
    lastName: "soares",
    username: "ncnegoleo",
    password: "123",
    id: 1
}];

//var users = [];

router.get('/users', function (req, res) {
  res.json(users);
});

router.get('/users/:prm', function (req, res) {
  users.forEach(function (user) {
    if(user.id == req.params.prm) {
      res.json(user);
      return;
    } else if (user.username == req.params.prm) {
      res.json(user);
      return;
    }
  });
  res.status(204).end();
});

router.post('/users', function (req, res) {
  var postUser = req.body;
  var duplicate = false;

  users.forEach(function (usr) {
    if(postUser.username == usr.username) {
      duplicate = true;
    }
  });

  if(!duplicate) {
    var lastUser = users[users.length - 1] || {id: 0};
    postUser.id = lastUser.id + 1;

    users.push(postUser);
    res.json({success: true});
  } else {
    res.json({success: false, message: `Username '${postUser.username}' is already taken!`});
  }
});

router.put('/users/:id', function (req, res) {
  var postUser = req.body;
  var index = -1;

  for (var i = 0; i < users.length; i++) {
      if (users[i].id == req.params.id) {
          index = i;
          break;
      }
  }

  if(index != -1) {
    postUser.id = users[index].id;
    users[index] = postUser;
    res.json(users[index]);
  } else {
      res.json(false);
  }
});

router.delete('/users/:id', function (req, res) {
  var index = -1;
  for (var i = 0; i < users.length; i++) {
      if(users[i].id == req.params.id) index = i;
  }

  if(index != -1) {
    users.splice(index, 1);
    res.json(true);
  } else {
    res.status(404).end();
  }
});

router.post('/authenticate', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var isCorrect = false;

  users.forEach(function (user) {
    if(user.username == username && user.password == password) {
      isCorrect = true;
    }
  });
  if(isCorrect) {
    res.json({success: true, token: '!@r*!1aq!&#¨eq@q#*¨e#!)@83'});
  } else {
    res.json({success: false, message: 'Username or password is incorrect'});
  }
});

module.exports = router;
