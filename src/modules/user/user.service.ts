import { prisma } from "../../config/db"
import { Prisma, User } from "@prisma/client"
import { userController } from "./user.controller"

 

  const createUserDb = async (payload:Prisma.UserCreateInput):Promise<User> =>{

    const createUser = await prisma.user.create({
        data:payload
    })
    return createUser

  }

  const getAllFromDb = async () =>{

    const result  = await prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            phone:true,
            createdAt:true,
            picture:true,
            role:true,
            status:true,
            posts:true
        },
        orderBy:{
            createdAt: "desc"
        }
    })
    return result
  
 
    

  }
  const getSingleUserById = async (id:number) =>{

    const result  = await prisma.user.findUnique({
        where: {
            id
        },
        select:{
            id:true,
            name:true,
            email:true,
            phone:true,
            createdAt:true,
            picture:true,
            role:true,
            status:true,
            posts:true
        },
    })
    return result

  }

  const userDelete = async (id:number) =>{

    const result  = await prisma.user.delete({
        where: {
            id
        }
    })
    return result

  }


  const updateUser =  async (id:number, payload:Prisma.PostUpdateInput):Promise<User> =>{
       const result  = await prisma.user.update({
        where: {
            id
        },
         data :{
      ...payload
    }
    })
    return result
  }



  export const userService = {
    createUserDb,
    getAllFromDb,
    getSingleUserById,
    userDelete,
    updateUser
  }