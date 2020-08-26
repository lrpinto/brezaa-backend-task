import { Document } from "mongoose"

export interface IUser extends Document {
  email: string,
  password: string,
  username: string,
  firstName: string,
  lastName: string,
  address: string,
  typeOfUser: string,
  profession: string,
  longitude: string
  latitude: string
}