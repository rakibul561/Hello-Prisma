import { prisma } from "../../config/db"

 

  const createUserDb = async (payload:any) =>{

    const createUser = await prisma.user.create({
        data:payload
    })
    return createUser

  }


  export const userService = {
    createUserDb
  }