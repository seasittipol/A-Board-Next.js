import { Search } from "lucide-react";
import React from "react";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import CreateModal from "./CreateModal";

export default function SearchBar() {
  const { authUser }: any = useAuth();
  const openModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (!authUser) {
      window.location.replace("/auth/login");
    } else if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex-1 flex border rounded-md items-center px-2">
        <Search />
        <input
          className="bg-grey100 outline-none p-2 w-full"
          placeholder="Search"
        />
      </div>
      <select className="select select-bordered w-full max-w-36">
        <option disabled selected>
          Community
        </option>
        <option>History</option>
        <option>Exercise</option>
        <option>Travel</option>
        <option>Environment</option>
        <option>Study</option>
        <option>Game</option>
      </select>
      <Button onClick={openModal}>Create +</Button>
      <CreateModal />
    </div>
  );
}
