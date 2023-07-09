/* eslint-disable no-unused-vars */
export interface IRepositoryBaseItem {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

export interface IRepositoryPageItem extends IRepositoryBaseItem {
  url: string;
}

export interface IGraphQLError {
  message: string;
}

export interface IUser {
  id: string;
  username: string;
}

export interface IReviewItem {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: IUser;
}

export interface IReviewFormValues {
  ownerName: string;
  repositoryName: string;
  rating: number;
  text?: string;
}

export interface ISignupFormValues {
  username: string;
  password: string;
  passwordConfirm: string;
}

export type ISignupFormSubmitValues = Omit<
  ISignupFormValues,
  "passwordConfirm"
>;

export enum RepositorySortType {
  Latest = "Latest repositories",
  HighestRated = "Highest rated Repositories",
  LowestRated = "Lowest rated repositories",
}

export enum OrderBy {
  CREATED_AT = "CREATED_AT",
  RATING_AVERAGE = "RATING_AVERAGE",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}
