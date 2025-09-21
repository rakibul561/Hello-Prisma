import { Request, Response } from "express"
import { AuthService } from "./auth.service"

 
 const loginWithEmailPass = async (req:Request, res:Response) =>{

     try {
  
        const result = await AuthService.loginWithEmailPass(req.body);
        return res.status(200).json({
            success:true,
            message: "user login succesfull",
            data:result
        })

        
     } catch (error) {
        console.log(error)
     }

 }
 const loginWithGoogle = async (req:Request, res:Response) =>{
     try {
        const result = await AuthService.loginWithGoogle(req.body);
        return res.status(200).json({
            success:true,
            message: "user login succesfull",
            data:result
        })
     } catch (error) {
        console.log(error)
     }

 }




export const AuthController = {
    loginWithEmailPass,
    loginWithGoogle,
   
}