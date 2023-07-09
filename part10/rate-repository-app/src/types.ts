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
