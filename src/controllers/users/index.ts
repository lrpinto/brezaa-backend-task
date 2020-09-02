import { Response, Request } from "express"
import { IUser } from "../../types/user"
import User from "../../models/user"

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find()
    res.status(200).json({ users })
  } catch (error) {
    throw error
  }
}

const loginUser = async (req: Request, res: Response): Promise<void> =>  {

    try {

      const { email, password } = req.body  as Pick<IUser, "email" | "password">

      const user: IUser | null = await User.findOne({ email });
      let authUser
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
          authUser = {...user.toJSON(), token };
      }

      if(authUser) { 
        res.status(201).json(authUser)
      } else {
        res.status(400).json({ message: 'Username or password is incorrect' })
      }

    } catch (error) {
      throw error
    }
}

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 
      "email" | "password" | "username" | "firstName" | "lastName" | "address" | "typeOfUser" | "profession" | "longitude" | "latitude">

    if (body.typeOfUser === "1" && !body.profession) {
      res
        .status(417)
        .json({ message: "Missing profession" })
    }

    if (await User.findOne({ email: body.email })) {
      res
        .status(409)
        .json({ message: "Email already registered", email: body.email })
    }

    if (!body.password) {
      res
        .status(417)
        .json({ message: "Missing password" });
    } else {
      // hash password
      const password = bcrypt.hashSync(body.password, 10);

      const user: IUser = new User({ ...body, password })

      console.log(user)

      const newUser: IUser = await user.save()
      const allUsers: IUser[] = await User.find()

      res
        .status(201)
        .json({ message: "User added", user: newUser, users: allUsers })
    }
  } catch (error) {
    throw error
  }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updateUser: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body
    )
    const allUsers: IUser[] = await User.find()
    res.status(200).json({
      message: "User updated",
      user: updateUser,
      users: allUsers,
    })
  } catch (error) {
    throw error
  }
}


const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    )
    const allUsers: IUser[] = await User.find()
    res.status(200).json({
      message: "User deleted",
      user: deletedUser,
      users: allUsers,
    })
  } catch (error) {
    throw error
  }
}

export { getUsers, loginUser, addUser, updateUser, deleteUser }