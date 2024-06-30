import { useContext } from "react";
import { PostContext } from "../contexts/PostComtext";

export default function usePost() {
  return useContext(PostContext);
}
