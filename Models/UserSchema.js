const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
var userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    encrypted_pass: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypted_pass = this.securePass(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  auth: function (password) {
    return this.securePass(password) === this.encrypted_pass;
  },
  securePass: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (e) {
      return "";
    }
  },
};
module.exports = mongoose.model("User", userSchema);
