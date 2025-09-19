 

  import express from "express"
import { userController } from "./user.controller"

  const router = express.Router()

 router.get("/", userController.getAllFromDb)
 router.get("/:id", userController.getUserById)
  router.delete("/:id", userController.deleteUser)
router.patch("/:id", userController.userUpdate)
 router.post("/", userController.createUser)

 export const userRouter = router;  








