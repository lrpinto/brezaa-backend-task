import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "../routes"
import bodyParser from "body-parser"
import { jwt } from '../helpers/jwt'
import { errorHandler } from '../helpers/error-handler'


const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cors())

// use JWT auth to secure the api
app.use(jwt());

app.use(userRoutes)

// global error handler
app.use(errorHandler);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lwdez.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })