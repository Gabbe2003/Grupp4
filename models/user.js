const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(new Error(`Error while hashing password: ${error.message}`));
  }
});

UserSchema.statics.registerWithGoogle = async function (googleId, email) {
  try {
    let user = await this.findOne({ googleId });

    if (!user) {
      user = new this({
        username: email.split("@")[0],
        email: email,
        googleId: googleId,
      });

      await user.save();
    }

    return user;
  } catch (error) {
    throw new Error(`Error registering with Google: ${error.message}`);
  }
};

module.exports = mongoose.model("User", UserSchema);
