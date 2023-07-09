import React from "react";
import { Picker } from "@react-native-picker/picker";
import { RepositorySortType } from "../../types";

interface IRepositorySortSelectionProps {
  sort: [
    RepositorySortType,
    React.Dispatch<React.SetStateAction<RepositorySortType>>,
  ];
}

const RepositorySortSelection = ({ sort }: IRepositorySortSelectionProps) => {
  const [sortBy, setSortBy] = sort;
  return (
    <Picker
      selectedValue={sortBy}
      // eslint-disable-next-line no-unused-vars
      onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
    >
      <Picker.Item
        label={RepositorySortType.Latest}
        value={RepositorySortType.Latest}
      />
      <Picker.Item
        label={RepositorySortType.HighestRated}
        value={RepositorySortType.HighestRated}
      />
      <Picker.Item
        label={RepositorySortType.LowestRated}
        value={RepositorySortType.LowestRated}
      />
    </Picker>
  );
};

export default RepositorySortSelection;
