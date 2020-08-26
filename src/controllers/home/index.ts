import { Response, Request } from "express"

const getHome = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json("Hello there!")
  } catch (error) {
    throw error
  }
}

export { getHome }
