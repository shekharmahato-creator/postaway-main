import PostModel from "../post/post.model.js";

export default class CommentModel {
  constructor(id, postId, userId, comment) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.comment = comment;
  }
  static add(postId, userId, comment) {
    const post = PostModel.getAll().find(
      (p) => p.id == postId && p.userId == userId
    );
    if (post) {
      const newComment = new CommentModel(
        comments.length + 1,
        postId,
        userId,
        comment
      );
      comments.push(newComment);
      return newComment;
    } else {
      return "Post not found";
    }
  }
  // getting all users comments for one post
  static getAll(postId) {
    return comments.filter((c) => c.postId == postId);
  }
  //   getting one user comments on single post
  static getOne(postId, userId) {
    return comments.filter((c) => c.postId == postId && c.userId == userId);
  }
  static remove(id, userId) {
    const index = comments.findIndex((c) => c.id == id && c.userId == userId);
    if (index !== -1) {
      comments.splice(index, 1);
      return "comment delete successfully";
    }
    return "No comment found";
  }
  static update(id, posteId, userId, updatedComment) {
    const findCommentIndex = comments.findIndex(
      (comment) =>
        comment.id == id &&
        comment.postId == posteId &&
        comment.userId == userId
    );
    if (findCommentIndex !== -1) {
      comments[findCommentIndex].comment = updatedComment;
      return comments[findCommentIndex];
    }
  }
}
let comments = [
  new CommentModel(1, 1, 1, "Wonderful!"),
  new CommentModel(2, 1, 2, "Thank You!"),
];
