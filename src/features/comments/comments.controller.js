import CommentModel from "./comments.model.js";

export default class CommentController {
  addNewComment(req, res, next) {
    try {
      const { userId } = req.user;
      const { postId, comment } = req.body;
      const result = CommentModel.add(postId, userId, comment);
      return res.send({ result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  getComments(req, res, next) {
    try {
      const postId = req.params.id;
      let comments = CommentModel.getAll(postId);
      if (comments.length <= 0) {
        return res.status(404).send({ msg: "No comments found for this post" });
      }
      return res.status(200).send({ comments });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  getOneUserComments(req, res, next) {
    try {
      const { userId } = req.user;
      const postId = req.params.id;
      const comments = CommentModel.getOne(postId, userId);
      if (comments.length <= 0) {
        return res
          .status(404)
          .send({ msg: "No comments found for the user on this post" });
      }
      return res.status(200).send({ comments });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  removeComment(req, res, next) {
    try {
      const id = req.params.id;
      const { userId } = req.user;
      const result = CommentModel.remove(id, userId);
      return res.send({ msg: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  updateComment(req, res, next) {
    try {
      const { userId } = req.user;
      const { postId, updatedComment } = req.body;
      const id = req.params.id;
      const comment = CommentModel.update(id, postId, userId, updatedComment);
      if (!comment) {
        return res.status(404).send({ msg: "Comment not found" });
      }
      return res
        .status(201)
        .send({ msg: "Comment updated successfully", comment });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
