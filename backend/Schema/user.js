import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
     name: {
      type: String,
      required: true, 
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    gender:{
      type:"string",
    enum:["male","female","other"],
    required:true
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);