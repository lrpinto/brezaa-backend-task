import { Document } from "mongoose"

export interface IReview extends Document {
  reviewValue: number,
  comment: string,
  sellerId: string
}