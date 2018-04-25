const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    imgProfile: {
      type: String,
      default:
        "http://res.cloudinary.com/deavo73zk/image/upload/v1524561053/anonimo-icon.png"
    },
    postalCode: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;