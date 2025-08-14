import mongoose from "mongoose";

export const userRoles = {
  admin: "admin",
  member: "member",
};
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    
    role: {
       type: String,
      enum: Object.values(userRoles),
      default: userRoles.member,
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;