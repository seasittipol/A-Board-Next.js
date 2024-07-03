import React from "react";
import Button from "./Button";
import usePost from "../hooks/usePost";

export default function EditModal({
  handleSaveForm,
  community,
  title,
  content,
}: any) {
  const { setEditCommunity, setEditTitle, setEditContent, closeModal }: any =
    usePost();

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box min-h-96">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Edit Post</h3>
          <select
            className="select select-bordered w-full max-w-52"
            onChange={(e) => setEditCommunity(e.target.value)}
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
            onChange={(e) => setEditTitle(e.target.value)}
            value={title}
          />
          <textarea
            rows={2}
            placeholder="What's on your mind..."
            className="input input-bordered w-full min-h-40"
            onChange={(e) => setEditContent(e.target.value)}
            value={content}
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              className="bg-white text-success border border-success h-[40px] w-[105px] rounded-md"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveForm}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
