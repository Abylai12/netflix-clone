import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  _id: Schema.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  image: string;
  otp?: string;
  searchHistory: ISearchHistory[];
  passwordResetToken?: string;
  passwordResetTokenExpire?: Date;
  created_at: Date;
  updated_at: Date;
}

interface ISearchHistory {
  id: string;
  image: string;
  title: string;
  searchType: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: [true, "Хэрэглэгчийн нэрийг оруулах"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Хэрэглэгчийн имейл оруулах"],
  },
  password: {
    type: String,
    minlength: [8, "Хэрэглэгчийн пасс хамгийн багадаа 8 тэмдэгт байна"],
    required: [true, "Хэрэглэгчийн түлхүүр үг оруулах"],
  },
  image: {
    type: String,
  },
  searchHistory: [
    {
      id: { type: String, required: true },
      image: { type: String, required: true },
      title: { type: String, required: true },
      searchType: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  otp: {
    type: String,
    default: null,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetTokenExpire: { type: Date, default: undefined },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
  }
});

const User = model("User", userSchema);
export default User;
