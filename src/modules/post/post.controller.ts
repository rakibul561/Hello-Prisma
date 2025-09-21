import { Request, Response } from "express"
import { postService } from "./post.service";

 

  const createPost = async (req:Request, res:Response) =>{
     try {

        const  posts = await postService.createPostDb(req.body)
        res.status(201).json(posts);
        
     } catch (error) {
       res.status(500).send(error)
     }
  }

  const getSinglePost = async (req:Request, res:Response) =>{

     try {

        const  posts = await postService.getSinglePost(Number(req.params.id))
        res.status(201).json(posts);
        
     } catch (error) {
       res.status(500).send(error)
     }
  }




// controller
const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const result = await postService.getAllPosts({ page, limit, search, isFeatured, tags });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts", details: err });
    }
};



const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);  

    const payload = req.body;

    const result = await postService.updatePost(id, payload);

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
  
 const deletePost = async (req:Request, res:Response) =>{
     try {
      
      const  posts = await postService.deletePost(Number(req.params.id))
       return res.status(200).json({
      success: true,
      message: "Post deleted succesfull successfully",
       data: posts,
    });
        
     } catch (error) {
       res.status(500).send(error)
     }
  }
  

 

  export const postController = {
    createPost,
    getSinglePost,
  getAllPosts,
    updatePost,
    deletePost
    
  }