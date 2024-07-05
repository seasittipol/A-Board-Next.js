import React from "react";
import Button from "./Button";
import usePost from "../hooks/usePost";

export default function DeleteModal() {
  const { closeModalDelete, deletePostId, handleConfirmDeletePost }: any =
    usePost();
  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box min-h-48">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form>
          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className="font-bold text-lg">
              Please confirm if you wish to delete the post
            </h3>
            <div className="flex flex-col items-center">
              <p>Are you sure you want to delete the post?</p>
              <p>Onec deleted, it cannot be recovered.</p>
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                className="bg-white text-success border border-success h-[40px] w-[105px] rounded-md"
                onClick={closeModalDelete}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 h-[40px] w-[105px] rounded-md text-white"
                type="button"
                onClick={() => handleConfirmDeletePost(deletePostId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
