import { MessageCircle } from "lucide-react";
import React from "react";

export default function Blog(props: any) {
  const { title, body, category, user, comment } = props;
  return (
    <div className="flex flex-col border border-grey100 bg-white p-5">
      <div>{user?.firstName}</div>
      <div>{category}</div>
      <section>{title}</section>
      <p>{body}</p>
      <div className="flex gap-2 items-center">
        <MessageCircle />
        <div>{comment.Comments} comments</div>
      </div>
    </div>
  );
}
