const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var users = [];

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/users', function (req, res) {
  res.json(users);
});

app.get('/api/users/:prm', function (req, res) {
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

app.post('/api/users', function (req, res) {
  var postUser = req.body;
  var duplicate = false;

  users.forEach(function (usr) {
    if(postUser.username == usr.username) {
      duplicate = true;
    }
  });

  if(!duplicate) {
    var lastUser = users[users.length - 1] || {id: 0}
    postUser.id = lastUser.id + 1;

    users.push(postUser);
    res.json({success: true});
  } else {
    res.json({success: false, message: `Username '${postUser.username}' is already taken!`});
  }
});

app.put('/api/users/:id', function (req, res) {
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

app.delete('/api/users/:id', function (req, res) {
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

// def port
const PORT = process.env.port || 4000;


// listen for requests
app.listen(PORT, function () {
    console.log(`now listen for requests in port: ${PORT}`);
});
