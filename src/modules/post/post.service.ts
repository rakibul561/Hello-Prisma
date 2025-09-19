
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



// service
const getAllPost = async ({
  page,
  limit,
  search,
}: {
  page: number
  limit: number
  search: string
}) => {
  const skip = (page - 1) * limit   // ✅ fix here

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where: search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined, // ✅ search না থাকলে সব result আসবে
  })

  return result
}




const updatePost = async (id: number, payload:Prisma.PostUpdateInput):Promise<Post> => {
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