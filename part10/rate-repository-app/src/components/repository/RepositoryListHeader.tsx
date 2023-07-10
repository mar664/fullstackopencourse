import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import RepositorySortSelection from "./RepositorySortSelection";
import { RepositorySortType } from "../../types";
import { useDebouncedCallback } from "use-debounce";
interface IRepositoryRepositoryListHeaderProps {
  sortBy: RepositorySortType;
  setSortBy: React.Dispatch<React.SetStateAction<RepositorySortType>>;
  setSearchBy: React.Dispatch<React.SetStateAction<string>>;
}

const RepositoryListHeader = ({
  sortBy,
  setSortBy,
  setSearchBy,
}: IRepositoryRepositoryListHeaderProps) => {
  // Manage search bar text separately from the text used for search
  const [searchBy, _setSearchBy] = useState<string>("");

  const onChangeSearch = useDebouncedCallback((query: string) => {
    setSearchBy(query);
  }, 500);

  return (
    <>
      <Searchbar
        value={searchBy}
        placeholder="Search"
        onChangeText={(value) => {
          _setSearchBy(value);
          onChangeSearch(value);
        }}
      />
      <RepositorySortSelection sortBy={sortBy} setSortBy={setSortBy} />
    </>
  );
};

export default RepositoryListHeader;
