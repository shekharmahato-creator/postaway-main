import express from "express";
import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import fileUpload from "../../middlewares/fileUpload.middleware.js";

const postController = new PostController();

const postRouter = express.Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getOnePost);
postRouter.post("/userPosts", jwtAuth, postController.getUserPosts);
postRouter.post(
  "/add",
  jwtAuth,
  fileUpload.single("image"),
  postController.createPost
);
postRouter.put(
  "/update/:id",
  jwtAuth,
  fileUpload.single("image"),
  postController.updatePost
);
postRouter.delete("/delete/:id", jwtAuth, postController.deletePost);

export default postRouter;
