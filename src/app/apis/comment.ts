import axiosInstance from "../config/axiosInstance";
import { Comments } from "../types/type";

export const createCommentApi = (comment: Comments) =>
  axiosInstance.post("/comments", comment);

export const updateCommentApi = (id: number, comment: Comments) =>
  axiosInstance.patch(`/comments/${id}`, comment);

export const deleteCommentApi = (id: number) =>
  axiosInstance.delete(`/comments/${id}`);

export const findCommentWithPostIdApi = (postId: number) =>
  axiosInstance.get(`/comment/${postId}`);
