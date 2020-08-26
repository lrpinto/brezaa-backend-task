import { IUser } from "../types/user"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    typeOfUser: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
      required: false,
    },

    longitude: {
      type: String,
      required: true,
    },

    latitude: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.password;
        delete ret._id;
    }
});

export default model<IUser>("User", userSchema)