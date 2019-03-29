export declare type GET_FEED_SUCCESS = 'GET_FEED_SUCCESS'
export const GET_FEED_SUCCESS: GET_FEED_SUCCESS = 'GET_FEED_SUCCESS'

export declare type GET_LIKES_SUCCESS = 'GET_LIKES_SUCCESS'
export const GET_LIKES_SUCCESS: GET_LIKES_SUCCESS = 'GET_LIKES_SUCCESS'

export declare type ADD_PICTURE_LIKE_SUCCESS = 'ADD_PICTURE_LIKE_SUCCESS'
export const ADD_PICTURE_LIKE_SUCCESS: ADD_PICTURE_LIKE_SUCCESS =
  'ADD_PICTURE_LIKE_SUCCESS'

export declare type REMOVE_PICTURE_LIKE_SUCCESS = 'REMOVE_PICTURE_LIKE_SUCCESS'
export const REMOVE_PICTURE_LIKE_SUCCESS: REMOVE_PICTURE_LIKE_SUCCESS =
  'REMOVE_PICTURE_LIKE_SUCCESS'

export declare type GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_SUCCESS: GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'

export declare type SUBMIT_COMMENTS_SUCCESS = 'SUBMIT_COMMENTS_SUCCESS'
export const SUBMIT_COMMENTS_SUCCESS: SUBMIT_COMMENTS_SUCCESS =
  'SUBMIT_COMMENTS_SUCCESS'

export declare type GET_USER_FEED_SUCCESS = 'GET_USER_FEED_SUCCESS'
export const GET_USER_FEED_SUCCESS: GET_USER_FEED_SUCCESS =
  'GET_USER_FEED_SUCCESS'

export interface GetFeedSuccessAction {
  readonly type: GET_FEED_SUCCESS
  readonly payload: {
    images: AppTypes.FeedImageData[],
  }
}

export interface GetLikesSuccessAction {
  readonly type: GET_LIKES_SUCCESS
  readonly payload: {
    likes: AppTypes.User[]
    pictureId: string,
  }
}

export interface AddPictureLikesSuccessAction {
  readonly type: ADD_PICTURE_LIKE_SUCCESS
  readonly payload: {
    pictureId: string,
  }
}

export interface RemovePictureLikesSuccessAction {
  readonly type: REMOVE_PICTURE_LIKE_SUCCESS
  readonly payload: {
    pictureId: string,
  }
}

export interface GetCommentsSuccessAction {
  readonly type: GET_COMMENTS_SUCCESS
  readonly payload: {
    pictureId: string
    comments: AppTypes.Comment[],
  }
}

export interface SubmitCommentSuccessAction {
  readonly type: SUBMIT_COMMENTS_SUCCESS
  readonly payload: {
    pictureId: string
    comment: AppTypes.Comment,
  }
}

export interface GetUserFeedSuccessAction {
  readonly type: GET_USER_FEED_SUCCESS
  readonly payload: {
    userId: string
    feed: AppTypes.FeedImageData[],
  }
}
