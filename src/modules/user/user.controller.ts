import { Request, Response } from "express"
import { userService } from "./user.service";


 

  const createUser = async (req:Request, res:Response) =>{
     try {

        const  users = await userService.createUserDb(req.body)
        res.status(201).json(users);
        
     } catch (error) {
       res.status(500).send(error)
     }
  }
  const getAllFromDb = async (req:Request, res:Response) =>{
     try {

        const  users = await userService.getAllFromDb()
        res.status(201).json(users);
        
     } catch (error) {
       res.status(500).send(error)
     }
  }

  const getUserById = async (req:Request, res:Response) =>{
     try {
        const  users = await userService.getSingleUserById(Number(req.params.id))
        res.status(201).json(users);
        
     } catch (error) {
       res.status(500).send(error)
     }
  }

  const userUpdate = async(req:Request, res:Response) =>{
    try {
      const id = Number(req.params.id)
      const payload = req.body;

      const updateuser  = await userService.updateUser(id, payload)
       res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateuser
    });
    } catch (error) {
      
    }
  }

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.userDelete(Number(req.params.id));
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error
    });
}}


  export const userController = {
    createUser,
    getAllFromDb,
    getUserById,
    deleteUser,
    userUpdate
  }