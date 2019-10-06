// user lodash / validator / user from mongodb schema
const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../models/User");

const validatePostInput = async data => {
  let errors = {};
  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.dob = _.get(data, "dob", "");
  data.usertype = _.get(data, "usertype", "");
  data.phone = _.get(data, "phone", "");
  if (validator.isEmpty(data.email)) {
    errors.email = "email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "email not valid";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) {
      errors.email = "email existed";
    }
  }

  if (validator.isEmpty(data.password)) {
    errrors.password = "password is required ";
  } else if (!validator.isLength(data.password, { min: 7 })) {
    errors.password = "password must be more than 7 characters";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password is required";
  } else if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "confirm password must be match";
  }

  if (
    !validator.equals(data.usertype, "admin") &&
    !validator.equals(data.usertype, "driver") &&
    !validator.equals(data.usertype, "customer")
  ) {
    errors.usertype = "usertype need to be correct";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

module.exports = { validatePostInput };
