import { render, screen, within } from "@testing-library/react-native";
import React from "react";
import { IRepositoryPageItem, IReviewItem } from "../types";
import { ReactTestInstance } from "react-test-renderer";
import RepositoryItemPageContainer from "../components/RepositoryItemPageContainer";
import dayjs from "dayjs";

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

const expectReview = (
  rItem: IReviewItem,
  reviewItem: ReactTestInstance
): boolean => {
  {
    expect(
      within(reviewItem).getByTestId("reviewItemRating")
    ).toHaveTextContent(rItem.rating.toString());

    expect(within(reviewItem).getByTestId("reviewItemUser")).toHaveTextContent(
      rItem.user.username
    );

    expect(within(reviewItem).getByTestId("reviewItemDate")).toHaveTextContent(
      dayjs(rItem.createdAt).format("DD.MM.YYYY")
    );

    expect(within(reviewItem).getByTestId("reviewItemText")).toHaveTextContent(
      rItem.text
    );
    return true;
  }
};

describe("RepositoryItemPage", () => {
  describe("RepositoryItemPageContainer", () => {
    it("renders repository and review information correctly", () => {
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

      const reviews = {
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
              id: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f.jaredpalmer.formik",
              text: "Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.",
              rating: 89,
              createdAt: "2023-07-06T23:38:02.813Z",
              user: {
                id: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f",
                username: "johndoe",
              },
            },
          },
          {
            node: {
              id: "cff8872a-8ff5-4092-ac2f-d79e65f18aa2.jaredpalmer.formik",
              text: "Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.",
              rating: 100,
              createdAt: "2023-07-07T00:38:02.813Z",
              user: {
                id: "cff8872a-8ff5-4092-ac2f-d79e65f18aa2",
                username: "elina",
              },
            },
          },
        ],
      };

      render(
        <RepositoryItemPageContainer
          repository={repository}
          reviews={reviews}
        />
      );

      const repositoryItem = screen.getByTestId("repositoryItem");

      expect(expectRepository(repository, repositoryItem)).toBeTruthy();

      const [reviewItem1, reviewItem2] = screen.getAllByTestId("reviewItem");

      expect(expectReview(reviews.edges[0].node, reviewItem1)).toBeTruthy();

      expect(expectReview(reviews.edges[1].node, reviewItem2)).toBeTruthy();
    });
  });
});
