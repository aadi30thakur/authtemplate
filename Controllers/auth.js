const User = require("../Models/UserSchema");
var jwt = require("jsonwebtoken");
var jwtSecret = "jwtsecret!";
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, usr) => {
    if (err) {
      console.log(err);
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};
exports.signin = (req, res) => {
  const { reqemail, password } = req.body;
  User.findOne({ reqemail }, (err, usr) => {
    if (err) {
      return res.status(400).json({
        error: "email not found in database!",
      });
    }
    if (!usr.auth(password)) {
      return res.status(403).json({ message: "password is incorrect " });
    }
    const token = jwt.sign({ _id: usr._id }, jwtSecret, { algorithm: "RS256" }); //TODO:add the password secret!!
    res.cookie("token", token, { expire: new Date() + 99999 });
    const { _id, name, email } = usr;
    return res.json({ token, user: { _id, name, email } });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};
