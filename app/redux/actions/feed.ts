import { ActionCreator, AnyAction, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { Feed, Picture } from '../../api'
import {
  ADD_PICTURE_LIKE_SUCCESS,
  AddPictureLikesSuccessAction,
  GET_COMMENTS_SUCCESS,
  GET_FEED_SUCCESS,
  GET_LIKES_SUCCESS,
  GET_USER_FEED_SUCCESS,
  GetCommentsSuccessAction,
  GetFeedSuccessAction,
  GetLikesSuccessAction,
  GetUserFeedSuccessAction,
  REMOVE_PICTURE_LIKE_SUCCESS,
  RemovePictureLikesSuccessAction,
  SUBMIT_COMMENTS_SUCCESS,
  SubmitCommentSuccessAction,
} from '../actionTypes'
import { AppState } from '../store/types'

type AsyncAction = ActionCreator<
  ThunkAction<Promise<any>, AppState, null, AnyAction>
>

export type GetFeedAction = AsyncAction

export type GetPictureLikesAction = AsyncAction

export type AddLikeToPictureAction = AsyncAction

export type RemoveLikeToPictureAction = AsyncAction

export type GetPictureCommentsAction = AsyncAction

export type SubmitCommentAction = AsyncAction

export type GetUserFeedAction = AsyncAction

export const getFeed: GetFeedAction = (userIds: string[] = []) => async (
  dispatch: Dispatch,
) => {
  const images = await Feed.getSubscribedFeed(userIds)
  dispatch(getFeedSuccess(images))
}

const getFeedSuccess = (
  images: AppTypes.FeedImageData[],
): GetFeedSuccessAction => ({
  type: GET_FEED_SUCCESS,
  payload: {
    images,
  },
})

export const getPictureLikes: GetPictureLikesAction = (
  pictureId: string,
) => async (dispatch: Dispatch) => {
  const likes = await Picture.getUsersLikesFromPicture(pictureId)

  dispatch(getPictureLikesSuccess(pictureId, likes))
}

const getPictureLikesSuccess = (
  pictureId: string,
  likes: AppTypes.User[],
): GetLikesSuccessAction => ({
  type: GET_LIKES_SUCCESS,
  payload: {
    likes,
    pictureId,
  },
})

export const addLikeToPicture: AddLikeToPictureAction = (
  pictureId: string,
) => async (dispatch: Dispatch) => {
  dispatch(addLikeToPictureSuccess(pictureId))
  await Picture.addLikeToPicture(pictureId)
}

const addLikeToPictureSuccess = (
  pictureId: string,
): AddPictureLikesSuccessAction => ({
  type: ADD_PICTURE_LIKE_SUCCESS,
  payload: {
    pictureId,
  },
})

export const removeLikeToPicture: RemoveLikeToPictureAction = (
  pictureId: string,
) => async (dispatch: Dispatch) => {
  dispatch(removeLikeToPictureSuccess(pictureId))
  await Picture.removeLikeFromPicture(pictureId)
}

const removeLikeToPictureSuccess = (
  pictureId: string,
): RemovePictureLikesSuccessAction => ({
  type: REMOVE_PICTURE_LIKE_SUCCESS,
  payload: {
    pictureId,
  },
})

export const getPictureComments: GetPictureCommentsAction = (
  pictureId: string,
) => async (dispatch: Dispatch) => {
  const comments = await Picture.getCommentsFromPicture(pictureId)

  dispatch(getCommentsSuccess(comments, pictureId))
}

const getCommentsSuccess = (
  comments: AppTypes.Comment[],
  pictureId: string,
): GetCommentsSuccessAction => ({
  type: GET_COMMENTS_SUCCESS,
  payload: {
    pictureId,
    comments,
  },
})

export const submitComment: SubmitCommentAction = (
  pictureId: string,
  content: string,
) => async (dispatch: Dispatch) => {
  const comment = await Picture.addCommentToPicture(content, pictureId)
  dispatch(submitCommentSuccess(pictureId, comment))
}

const submitCommentSuccess = (
  pictureId: string,
  comment: AppTypes.Comment,
): SubmitCommentSuccessAction => ({
  type: SUBMIT_COMMENTS_SUCCESS,
  payload: {
    pictureId,
    comment,
  },
})

export const getUserFeed: GetUserFeedAction = (userId: string) => async (
  dispatch: Dispatch,
) => {
  const feed = await Feed.getSubscribedFeed([userId])
  dispatch(getUserFeedSuccess(userId, feed))
}

const getUserFeedSuccess = (
  userId: string,
  feed: AppTypes.FeedImageData[],
): GetUserFeedSuccessAction => ({
  type: GET_USER_FEED_SUCCESS,
  payload: {
    userId,
    feed,
  },
})
