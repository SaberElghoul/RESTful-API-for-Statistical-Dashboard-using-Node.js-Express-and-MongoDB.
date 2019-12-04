var User = require('./userModel');
var _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.params = function (req, res, next, id) {
  User.findById(id)
    .populate('databases')
    .then(function (user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function (err) {
      next(err);
    });
};

exports.get = function (req, res, next) {
  User.find({})
    .populate('databases')
    .exec()
    .then(function (users) {
      res.json(users);
    }, function (err) {
      next(err);
    });
};

exports.getOne = function (req, res, next) {
  if ((!req.body.email) || (!req.body.password)) {

    res.json({
      message: 'email and password required'
    })
  } else {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ email })
      .populate('databases')
      .exec()
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              res.status(500);
              res.json({
                message: 'Error Ocured'
              })

            }


            if (result) {

              let token = jwt.sign({ email: user.email, _id: user._id }, 'SECRET',
                { expiresIn: '2h' })
              res.status(200);
              res.json({
                message: 'Login Successful',
                user: user,
                token
              })
            } else {
              res.json({
                message: 'Login Failed. Password doesn\'t Match '
              })

            }


          })

        } else {
          res.json({
            message: 'User Not Found '
          })

        }




      })
  }
};

exports.put = function (req, res, next) {


  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {

      res.json({
        error: err

      })
    }


    let update = req.body
    update.password = hash

    //    let update= new User({
    //      _id: req.user._id,

    //       email: req.body.email,
    //       password: hash,
    //       firstname:req.body.firstname,
    //       lastname:req.body.lastname,
    //       compnayname:req.body.compnayname

    //  })




    var user = req.user;


    console.log(user._id);
    console.log(update);

    _.merge(user, update);

    user.save(function (err, saved) {
      if (err) {
        next(err);
      } else {
        res.json(saved);
      }
    })





  })







};

exports.post = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {

      res.json({
        error: err

      })
    }

    let newUser = new User({

      email: req.body.email,
      password: hash,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      compnayname: req.body.compnayname

    })



    User.create(newUser)
      .then(function (user) {
        res.json(user);
      }, function (err) {
        next(err);
      });







  })
};

exports.delete = function (req, res, next) {
  req.user.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

