import mongoose, { Schema } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
}


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model<User>("User", userSchema);
export default User;
