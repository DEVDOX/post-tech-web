import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  NaiveDateTime: any;
};

export type CreateParams = {
  avatar?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  strategy: Scalars['String'];
  strategyId?: Maybe<Scalars['String']>;
  uniqueName?: Maybe<Scalars['String']>;
};

export type CreatePostParams = {
  body: Scalars['String'];
  state: Scalars['String'];
  tags?: Maybe<Array<Maybe<TagParams>>>;
  title: Scalars['String'];
};

export type LoginParams = {
  avatar: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  strategy: Scalars['String'];
  strategyId: Scalars['String'];
  strategyToken: Scalars['String'];
  uniqueName: Scalars['String'];
};


export type PostPayloadType = {
   __typename?: 'PostPayloadType';
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  result?: Maybe<PostType>;
  successful: Scalars['Boolean'];
};

export type PostType = {
   __typename?: 'PostType';
  body?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tags>>>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  url?: Maybe<Scalars['String']>;
  userDetail?: Maybe<UserDetailType>;
  uuid?: Maybe<Scalars['String']>;
};

export type RootMutationType = {
   __typename?: 'RootMutationType';
  createPost?: Maybe<PostPayloadType>;
  createUser?: Maybe<UserDetailTypePayload>;
  login?: Maybe<SessionPayloadType>;
};


export type RootMutationTypeCreatePostArgs = {
  params: CreatePostParams;
};


export type RootMutationTypeCreateUserArgs = {
  params: CreateParams;
};


export type RootMutationTypeLoginArgs = {
  params: LoginParams;
};

export type RootQueryType = {
   __typename?: 'RootQueryType';
  getPostByUrl?: Maybe<PostType>;
  getPublicPosts?: Maybe<Array<Maybe<PostType>>>;
  getUserDetail?: Maybe<UserDetailType>;
  getUserDetailByUName?: Maybe<UserDetailType>;
  getUserDetailList?: Maybe<Array<Maybe<UserDetailType>>>;
  getUserPostsById?: Maybe<Array<Maybe<PostType>>>;
  getUserPostsByUName?: Maybe<Array<Maybe<PostType>>>;
};


export type RootQueryTypeGetPostByUrlArgs = {
  url?: Maybe<Scalars['String']>;
};


export type RootQueryTypeGetPublicPostsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};


export type RootQueryTypeGetUserDetailArgs = {
  strategy?: Maybe<Scalars['String']>;
  strategyId?: Maybe<Scalars['String']>;
};


export type RootQueryTypeGetUserDetailByUNameArgs = {
  uniqueName?: Maybe<Scalars['String']>;
};


export type RootQueryTypeGetUserDetailListArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['String']>;
};


export type RootQueryTypeGetUserPostsByIdArgs = {
  userId: Scalars['Int'];
};


export type RootQueryTypeGetUserPostsByUNameArgs = {
  uniqueName: Scalars['String'];
};

export type SessionPayloadType = {
   __typename?: 'SessionPayloadType';
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  result?: Maybe<SessionType>;
  successful: Scalars['Boolean'];
};

export type SessionType = {
   __typename?: 'SessionType';
  token?: Maybe<Scalars['String']>;
  userDetail?: Maybe<UserDetailType>;
};

export type TagParams = {
  name: Scalars['String'];
};

export type Tags = {
   __typename?: 'Tags';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  urlName?: Maybe<Scalars['String']>;
};

export type UserDetailType = {
   __typename?: 'UserDetailType';
  avatar?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  location?: Maybe<Scalars['String']>;
  uniqueName?: Maybe<Scalars['String']>;
};

export type UserDetailTypePayload = {
   __typename?: 'UserDetailTypePayload';
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  result?: Maybe<UserDetailType>;
  successful: Scalars['Boolean'];
};

export type ValidationMessage = {
   __typename?: 'ValidationMessage';
  code: Scalars['String'];
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<ValidationOption>>>;
  template?: Maybe<Scalars['String']>;
};

export type ValidationOption = {
   __typename?: 'ValidationOption';
  key: Scalars['String'];
  value: Scalars['String'];
};



