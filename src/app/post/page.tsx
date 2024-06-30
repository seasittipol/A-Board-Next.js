import React, { useState } from "react";
import { findAllPostsApi } from "../apis/post";
import { toast } from "react-toastify";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const findAllPosts = async () => {
    try {
      const response = await findAllPostsApi();
      if (response) {
        setPosts(response.data);
      }
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  };
  return <div>PostPage</div>;
}
