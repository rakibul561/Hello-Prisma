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
 

  export const postController = {
    createPost,
    
  }