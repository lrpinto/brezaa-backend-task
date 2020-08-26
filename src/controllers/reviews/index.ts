import { Response, Request } from "express"
import { IReview } from "../../types/review"
import { IUser } from "../../types/user"
import Review from "../../models/review"
import User from "../../models/user"

const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const body = req.body as Pick<IReview, 
      "reviewValue" | "comment" >

    const {
      query: { sellerId },
    } = req
    
    if (!sellerId || !(typeof sellerId === 'string') || !sellerId.match(/^[0-9a-fA-F]{24}$/)) {
        res
        .status(417)
        .json({ message: "Invalid sellerId", sellerId })
    }

    const sellerExists: boolean = await User.exists(
      { _id: sellerId, typeOfUser: "1" },
    )

    if(!sellerExists) {
        res
        .status(404)
        .json({ message: "Seller not found", sellerId })
    } else {
        const review: IReview = new Review({ ...body, sellerId })

        const newReview: IReview = await review.save()
        const allReviews: IReview[] = await Review.find()

        res
        .status(201)
        .json({ message: "Review added", review: newReview, reviews: allReviews })
    }


  } catch (error) {
    throw error
  }
}


const getSellerReviews = async (req: Request, res: Response): Promise<void> => {
  try {

    const {
      query: { sellerId },
    } = req
    
    if (!sellerId || !(typeof sellerId === 'string') || !sellerId.match(/^[0-9a-fA-F]{24}$/)) {
        res
        .status(417)
        .json({ message: "Invalid sellerId", sellerId })
    }

    const sellerExists: boolean = await User.exists(
      { _id: sellerId, typeOfUser: "1" },
    )

    if(!sellerExists) {
        res
        .status(404)
        .json({ message: "Seller not found", sellerId })
    } else {
        const sellerReviews: IReview[] = await Review.find().where("sellerId").equals(sellerId)
        res.status(200).json({ sellerReviews })
    }
  } catch (error) {
    throw error
  }
}

export { addReview, getSellerReviews }