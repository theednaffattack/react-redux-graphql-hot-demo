var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// define the schema for our user model
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  roles: [
    {
      type: String,
      enum: ["admin", "user", "editor", "contributor"]
    }
  ]
});

userSchema.pre("save", function(next) {
  if (this.roles.length == 0) this.roles.push("user");

  next();
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
