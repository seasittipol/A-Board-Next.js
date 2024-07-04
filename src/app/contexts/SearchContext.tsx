"use client";
import { ChangeEvent, createContext, ReactNode, useState } from "react";

export const SearchContext = createContext({});

export default function SearchContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [selectCommunity, setSelectCommunity] = useState<string | null>(null);

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleSelectCommunity = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectCommunity(e.target.value);
  };

  const contextValue = {
    inputSearch,
    handleInputSearch,
    selectCommunity,
    handleSelectCommunity,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
