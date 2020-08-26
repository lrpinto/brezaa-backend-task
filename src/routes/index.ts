import { Router } from "express"
import { getHome } from "../controllers/home"
import { addUser, loginUser } from "../controllers/users"
import { getSellers, getNearestSellers } from "../controllers/sellers"
import { addReview, getSellerReviews } from "../controllers/reviews"


const bodyParser = require('body-parser')

// create application/json parser
const jsonParser = bodyParser.json()

const router: Router = Router()

/**
 * Home
 */
router.get("/", getHome)

/**
 * User routes
 */

router.post("/users/signup", jsonParser, addUser)

router.post("/users/login", jsonParser, loginUser)

/**
 * Seller routes
 */

router.get("/users/getAllSellers", getSellers)

router.get("/getNearestSellers", getNearestSellers)

/**
 * Review routes
 */

 router.post("/review", jsonParser, addReview)

 router.get("/getSellerReviews", getSellerReviews)

export default router