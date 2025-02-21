import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  full_name: String,
  dob: String,
  email: String,
  roll_number: String,
  data: Array,
});

const User = mongoose.model("User", UserSchema);

export default User;
