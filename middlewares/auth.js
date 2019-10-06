const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, "khoapham", (err, decoded) => {
    if (err)
      return res.status(403).json({
        message: "token not valid"
      });
    if (decoded) {
      req.user = decoded;
    //   console.log(decoded);
      return next();
    }
  });
};

const authorzied = usertypearr => {
  return (req, res, next) => {
    const usertype = req.user.usertype;
    for (let index = 0; index < usertypearr.length; index++) {
      if (usertypearr[index] === usertype) {
        console.log(usertype);
        return next();
      } else {
        return res.status(403).json({
          message: "permission denied"
        });
      }
    }
  };
};

module.exports = {
  authenticate,
  authorzied
};
