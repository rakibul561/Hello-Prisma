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

  const getSinglePost = async (id:number) =>{

    const result = await prisma.post.findUnique({
      where:{
        id
      },
    

    })
    return result

  }

  const getAllPost = async () =>{

    const result = await prisma.post.findMany()
    return result
  }

const updatePost = async (id: number, payload: { title?: string; content?: string }) => {
   const result = await prisma.post.update({
    where:{
       id
    },
    data :{
      ...payload
    }
   })

  return result;
};
 
 

 const deletePost = async (id:number) =>{

    const result = await prisma.post.delete({
      where: {
        id
      }
    })
    return result
  } 

  


 


  export const postService = {
    createPostDb,
    getSinglePost,
    getAllPost,
    updatePost,
    deletePost

  }