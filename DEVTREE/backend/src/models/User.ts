import mongoose, { Schema } from "mongoose";

<<<<<<< HEAD
=======
interface IUser {
  name: string;
  email: string;
  password: string;
}

>>>>>>> 61d215cc49618be2d3dbe19a19b76340c61eb2c6
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
<<<<<<< HEAD
  },
});


const User = mongoose.model("User", userSchema);
export default User;
=======
    trim: true,
  },
});
const User = mongoose.model<IUser>("User", userSchema);
export default User;
>>>>>>> 61d215cc49618be2d3dbe19a19b76340c61eb2c6
