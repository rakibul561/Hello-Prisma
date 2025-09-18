import { prisma } from "../../config/db"
import { Post, Prisma,  } from "@prisma/client"

 

  const createPostDb = async (payload:Prisma.PostCreateInput):Promise<Post> =>{

    const createPost = await prisma.post.create({
        data:payload,
        include:{
            author:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    })
    return createPost

  }


 


  export const postService = {
    createPostDb,
  }