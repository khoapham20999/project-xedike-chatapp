const { User } = require("../../../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  validatePostInput
} = require("../../../validation/user/userValidation");

// all of your determinations will be paid

module.exports.getUser = (req, res, next) => {
  User.find()
    .then(user => {
      // console.log(user);
      res.json(user).status(200);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  const { email, password, dob, usertype, phone } = req.body;
  const { isValid, errors } = await validatePostInput(req.body);
  console.log(isValid);
  console.log(errors);
  if (!isValid) return res.status(400).json(errors);
  const newUser = new User({
    email,
    password,
    dob,
    usertype,
    phone
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.json(err);
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
};

module.exports.getUserbyid = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      message: "id not valid"
    });
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });
      res.status(200).json(user);
    })
    .catch(err => {
      if (err.status)
        return res.json({ message: err.message }).status(err.status);
      res.json(err);
    });
};

module.exports.updateusesrbyid = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not valid" });
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 400, message: "user not found" });
      const { email, password, dob, usertype, phone } = req.body;
      user.email = email;
      user.password = password;
      user.dob = dob;
      user.usertype = usertype;
      user.phone = phone;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.json(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return res.json(err);
          user.password = hash;
          return user
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => {
              res.json(err);
            });
        });
      });
    })
    .catch(err => {
      if (err.status)
        return res.status(err.status).json({ message: err.message });
      res.json(err);
    });
};

module.exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(403).json({ message: "id not valid" });
  User.deleteOne({ _id: id })
    .then(result => {
      console.log("User deleted");
      res.json(result).status(200);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "user not found" });
      bcrypt.compare(password, user.password, (err, success) => {
        if (!success)
          return res.status(403).json({ message: "Incorrect password" });
        const payload = {
          email: user.email,
          usertype: user.usertype
        };
        jwt.sign(payload, "khoapham", { expiresIn: 3600 }, (err, token) => {
          if (err) return res.json(err);
          res.status(200).json({
            success: true,
            token: token
          });
        });
      });
    })
    .catch(err => {
      if (err.status)
        return res.status(err.status).json({ message: err.message });
      res.json(err);
    });
};
