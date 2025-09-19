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


  const getAllPost = async (req:Request, res:Response) =>{
     try {
      

        const  posts = await postService.getAllPost()
        res.status(201).json(posts);
        
     } catch (error) {
       res.status(500).send(error)
     }
  }
  



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
    getAllPost,
    updatePost,
    deletePost
    
  }