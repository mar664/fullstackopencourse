import { render, screen, within } from "@testing-library/react-native";
import React from "react";
import { IRepositoryPageItem } from "../types";
import { ReactTestInstance } from "react-test-renderer";
import RepositoryItemPageContainer from "../components/RepositoryItemPageContainer";

const toAbbreviatedForm = (count: number): string => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

const expectRepository = (
  rTtem: IRepositoryPageItem,
  repositoryItem: ReactTestInstance
): boolean => {
  {
    expect(
      within(repositoryItem).getByTestId("repositoryItemFullName")
    ).toHaveTextContent(rTtem.fullName);

    expect(
      within(repositoryItem).getByTestId("repositoryItemImage")
    ).toHaveProp("source", {
      uri: rTtem.ownerAvatarUrl,
    });

    expect(
      within(repositoryItem).getByTestId("repositoryItemDescription")
    ).toHaveTextContent(rTtem.description);

    expect(
      within(repositoryItem).getByTestId("repositoryItemLanguage")
    ).toHaveTextContent(rTtem.language);

    expect(
      within(repositoryItem).getByTestId("repositoryItemStarCount")
    ).toHaveTextContent(toAbbreviatedForm(rTtem.stargazersCount));

    expect(
      within(repositoryItem).getByTestId("repositoryItemForksCount")
    ).toHaveTextContent(toAbbreviatedForm(rTtem.forksCount));

    expect(
      within(repositoryItem).getByTestId("repositoryItemReviewCount")
    ).toHaveTextContent(toAbbreviatedForm(rTtem.reviewCount));

    expect(
      within(repositoryItem).getByTestId("repositoryItemRatingAverage")
    ).toHaveTextContent(rTtem.ratingAverage.toString());

    expect(
      within(repositoryItem).getByTestId("repositoryItemButton")
    ).toBeVisible();

    expect(
      within(repositoryItem).getByTestId("repositoryItemButton")
    ).toHaveTextContent("Open in GitHub");

    return true;
  }
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repository = {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
        url: "https://github.com/jaredpalmer/formik",
      };

      render(<RepositoryItemPageContainer repository={repository} />);

      const repositoryItem = screen.getByTestId("repositoryItem");

      expect(expectRepository(repository, repositoryItem)).toBeTruthy();
    });
  });
});
