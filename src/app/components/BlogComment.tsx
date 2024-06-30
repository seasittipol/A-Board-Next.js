import React from "react";

export default function BlogComment(props: any) {
  const { description, user } = props;
  return (
    <div className="flex gap-2">
      <div>
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={
            user.image ||
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
}
