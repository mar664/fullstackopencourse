import React from "react";
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
  const onChangeSearch = useDebouncedCallback((query: string) => {
    setSearchBy(query);
  }, 500);

  return (
    <>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} />
      <RepositorySortSelection sortBy={sortBy} setSortBy={setSortBy} />
    </>
  );
};

export default RepositoryListHeader;
