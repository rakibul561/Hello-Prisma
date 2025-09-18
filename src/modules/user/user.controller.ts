import { Request, Response } from "express"
import { userService } from "./user.service"

 

  const createUser = async (req:Request, res:Response) =>{
     try {

        const  users = await userService.createUserDb(req.body)
        res.send(users);
        
     } catch (error) {
        console.log(error)
     }
  }


  export const userController = {
    createUser
  }