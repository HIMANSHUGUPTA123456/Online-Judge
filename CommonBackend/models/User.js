import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: null,
      required: true,
      unique: true,
      trim: true,
    },
    fname: {
      type: String,
      default: null,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      default: null,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
