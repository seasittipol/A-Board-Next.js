import { Search } from "lucide-react";
import React from "react";
import Button from "./Button";
import CreateModal from "./CreateModal";
import usePost from "../hooks/usePost";
import useSearch from "../hooks/useSearch";

export default function SearchBar() {
  const { openModalCreate }: any = usePost();
  const { inputSearch, handleInputSearch, handleSelectCommunity }: any =
    useSearch();

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex-1 flex border rounded-md items-center px-2">
        <Search />
        <input
          className="bg-grey100 outline-none p-2 w-full"
          placeholder="Search"
          value={inputSearch}
          onChange={handleInputSearch}
        />
      </div>
      <select
        className="select select-bordered w-full max-w-36"
        onChange={handleSelectCommunity}
      >
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
      <Button onClick={openModalCreate}>Create +</Button>
      <CreateModal />
    </div>
  );
}
