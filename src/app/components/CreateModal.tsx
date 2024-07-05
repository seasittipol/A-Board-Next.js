import React from "react";
import Button from "./Button";
import usePost from "../hooks/usePost";

export default function CreateModal() {
  const {
    community,
    title,
    content,
    setCommunity,
    setTitle,
    setContent,
    handleCreatePost,
    closeModalCreate,
  }: any = usePost();

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box min-h-96">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Create Post</h3>
          <select
            className="select select-bordered w-full sm:max-w-52"
            onChange={(e) => setCommunity(e.target.value)}
            value={community}
          >
            <option disabled selected>
              Choose a community
            </option>
            <option>History</option>
            <option>Exercise</option>
            <option>Travel</option>
            <option>Environment</option>
            <option>Study</option>
            <option>Game</option>
          </select>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            placeholder="What's on your mind..."
            className="input input-bordered w-full min-h-40"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              className="bg-white text-success border border-success h-[40px] w-[105px] rounded-md"
              onClick={closeModalCreate}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCreatePost}>
              Post
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
