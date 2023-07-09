import { render, screen, within } from "@testing-library/react-native";
import React from "react";
import { RepositoryListContainer } from "../components/repository/RepositoryListContainer";
import { IRepositoryBaseItem, RepositorySortType } from "../types";
import { ReactTestInstance } from "react-test-renderer";

const toAbbreviatedForm = (count: number): string => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

const expectRepository = (
  rTtem: IRepositoryBaseItem,
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

    return true;
  }
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      const onPress = jest.fn();

      const setStateMock = jest.fn();

      const useStateMock: any = (useState: any) => [useState, setStateMock];

      render(
        <RepositoryListContainer
          repositories={repositories}
          pressHandler={onPress}
          sort={useStateMock(RepositorySortType.Latest)}
        />
      );

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(
        expectRepository(repositories.edges[0].node, firstRepositoryItem)
      ).toBeTruthy();

      expect(
        expectRepository(repositories.edges[1].node, secondRepositoryItem)
      ).toBeTruthy();
    });
  });
});
