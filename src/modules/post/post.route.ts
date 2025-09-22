 

  import express from "express"
import { postController } from "./post.controller";


  const router = express.Router()

   router.get("/stats", postController.getBlogStat)

 
  router.get("/all-post", postController.getAllPost)
  router.get("/:id", postController.getSinglePost)
   router.delete("/:id", postController.deletePost)
  router.patch("/:id", postController.updatePost)
  router.post("/", postController.createPost)
 



 export const postRouter = router;








