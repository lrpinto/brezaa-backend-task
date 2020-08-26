import { Response, Request } from "express"
import { IUser } from "../../types/user"
import User from "../../models/user"
import { point } from '@turf/helpers';
import distance from '@turf/distance';

const getSellers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find().where("typeOfUser").equals("1")
    res.status(200).json({ users })
  } catch (error) {
    throw error
  }
}


const getNearestSellers = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      query: { longitude, latitude, maxDistance },
    } = req

    if (!longitude) {
      res.status(417).json({ message: 'Missing longitude' })
    } else if (!latitude) {
      res.status(417).json({ message: 'Missing latitude' })
    } else if (!maxDistance) {
      res.status(417).json({ message: 'Missing maxDistance' })
    } else {
      const fromLong: number = +longitude; 
      const fromLat: number = +latitude; 
      const maxFromDistance: number = +maxDistance; 

      const users: IUser[] = await User.find().where("typeOfUser").equals("1")

      const nearestSellers: IUser[] = users.filter( user => {
        
        const from = point([fromLong, fromLat]);

        const toLong: number = +user.longitude; 
        const toLat: number = +user.latitude;
        const to = point([toLong, toLat]);

        const fromToDistance: number = distance(from, to, "miles");

        return fromToDistance <= maxFromDistance
      })

      res.status(200).json({ nearestSellers })
    }


  } catch (error) {
    throw error
  }
}

export { getSellers, getNearestSellers}