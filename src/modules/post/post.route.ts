 

  import express from "express"
import { postController } from "./post.controller";


  const router = express.Router()

 
  router.get("/all-post", postController.getAllPosts)
  router.get("/:id", postController.getSinglePost)
   router.delete("/:id", postController.deletePost)
  router.patch("/:id", postController.updatePost)
  router.post("/", postController.createPost)


 export const postRouter = router;








