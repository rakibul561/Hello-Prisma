
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



    const result = await prisma.$transaction(async (tnx) =>{

       await prisma.post.update({
      where: {id},
      data: {
        views: {
          increment: 1
        }
      }
     })

    return await prisma.post.findUnique({
      where:{
        id
      },
    

    })
    

    })
    

    
    return result

  }



const getAllPosts = async ({page, limit, search} : {page:number, limit:number, search:string}) => {

   const skip = (page - 1) * limit;
    const result = await prisma.post.findMany({
      skip,
      take:limit,
      where : {
         OR : [
           {
            title: {
              contains:search,
              mode:'insensitive'
            }
           },
           {
            content: {
              contains:search,
              mode:'insensitive'
            }
           }
         ]
      }
    });
    return result
  

   
};



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
 

 const getBlogStat = async () => {
    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.post.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true },
        })

        const featuredCount = await tx.post.count({
            where: {
                isFeatured: true
            }
        });

        const topFeatured = await tx.post.findFirst({
            where: { isFeatured: true },
            orderBy: { views: "desc" }
        })

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7)

        const lastWeekPostCount = await tx.post.count({
            where: {
                createdAt: {
                    gte: lastWeek
                }
            }
        })

        return {
            stats: {
                totalPosts: aggregates._count ?? 0,
                totalViews: aggregates._sum.views ?? 0,
                avgViews: aggregates._avg.views ?? 0,
                minViews: aggregates._min.views ?? 0,
                maxViews: aggregates._max.views ?? 0
            },
            featured: {
                count: featuredCount,
                topPost: topFeatured,
            },
            lastWeekPostCount
        };
    })

 }
  


 


  export const postService = {
    createPostDb,
    getSinglePost,
    getAllPosts,
    updatePost,
    deletePost,
    getBlogStat

  }