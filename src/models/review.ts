import { IReview } from "../types/review"
import { model, Schema } from "mongoose"

const reviewSchema: Schema = new Schema(
  {
    reviewValue: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    sellerId: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
)

reviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


export default model<IReview>("Review", reviewSchema)