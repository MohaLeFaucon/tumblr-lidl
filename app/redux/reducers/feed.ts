import flatten from 'lodash/flatten'

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
  SIGNOUT,
  SignoutSuccessAction,
  SUBMIT_COMMENTS_SUCCESS,
  SubmitCommentSuccessAction,
} from '../actionTypes'

export interface FeedState {
  globalFeed: AppTypes.FeedImageData[]
  likes: {
    [key: string]: AppTypes.User[],
  }
  comments: {
    [key: string]: AppTypes.Comment[],
  }
  usersFeed: {
    [key: string]: AppTypes.FeedImageData[],
  }
}

type FeedAction =
  | GetFeedSuccessAction
  | GetLikesSuccessAction
  | AddPictureLikesSuccessAction
  | RemovePictureLikesSuccessAction
  | GetCommentsSuccessAction
  | SubmitCommentSuccessAction
  | GetUserFeedSuccessAction
  | SignoutSuccessAction

const initialState: FeedState = {
  globalFeed: [],
  likes: {},
  comments: {},
  usersFeed: {},
}

export default function feedReducer(
  state: FeedState = initialState,
  action: FeedAction,
) {
  switch (action.type) {
    case GET_FEED_SUCCESS: {
      const { payload } = action as GetFeedSuccessAction

      return {
        ...state,
        globalFeed: payload.images,
      }
    }
    case GET_LIKES_SUCCESS: {
      const { payload } = action as GetLikesSuccessAction

      return {
        ...state,
        likes: {
          ...state.likes,
          [payload.pictureId]: payload.likes,
        },
      }
    }
    case ADD_PICTURE_LIKE_SUCCESS: {
      const { payload } = action as AddPictureLikesSuccessAction
      const usersFeed = flatten(Object.values(state.usersFeed))
      const pic = usersFeed.find((feed) => feed.id === payload.pictureId)
      let pictureUserId: string
      if (pic) {
        pictureUserId = pic.user.id
      }

      return {
        ...state,
        globalFeed: state.globalFeed.map((picture) => {
          if (picture.id === payload.pictureId) {
            return {
              ...picture,
              image: {
                ...picture.image,
                isLiked: true,
                likes: picture.image.likes + 1,
              },
            }
          }
          return picture
        }),
        usersFeed: {
          ...state.usersFeed,
          ...(pic && pic.user.id
            ? {
                [pictureUserId!]: state.usersFeed[pictureUserId!].map(
                  (picture) => {
                    if (picture.id === payload.pictureId) {
                      return {
                        ...picture,
                        image: {
                          ...picture.image,
                          isLiked: true,
                          likes: picture.image.likes + 1,
                        },
                      }
                    }
                    return picture
                  },
                ),
              }
            : {}),
        },
      }
    }
    case REMOVE_PICTURE_LIKE_SUCCESS: {
      const { payload } = action as RemovePictureLikesSuccessAction
      const usersFeed = flatten(Object.values(state.usersFeed))
      const pic = usersFeed.find((feed) => feed.id === payload.pictureId)
      return {
        ...state,
        globalFeed: state.globalFeed.map((picture) => {
          if (picture.id === payload.pictureId) {
            return {
              ...picture,
              image: {
                ...picture.image,
                isLiked: false,
                likes: picture.image.likes - 1,
              },
            }
          }
          return picture
        }),
        usersFeed: {
          ...state.usersFeed,
          ...(pic && pic.user.id
            ? {
                [pic.user.id]: state.usersFeed[pic.user.id].map((picture) => {
                  if (picture.id === payload.pictureId) {
                    return {
                      ...picture,
                      image: {
                        ...picture.image,
                        isLiked: false,
                        likes: picture.image.likes - 1,
                      },
                    }
                  }
                  return picture
                }),
              }
            : {}),
        },
      }
    }
    case GET_COMMENTS_SUCCESS: {
      const { payload } = action as GetCommentsSuccessAction

      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.pictureId]: payload.comments,
        },
      }
    }
    case SUBMIT_COMMENTS_SUCCESS: {
      const { payload } = action as SubmitCommentSuccessAction

      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.pictureId]: [
            ...(state.comments[payload.pictureId] || []),
            payload.comment,
          ],
        },
      }
    }
    case GET_USER_FEED_SUCCESS: {
      const { payload } = action as GetUserFeedSuccessAction

      return {
        ...state,
        usersFeed: {
          ...state.usersFeed,
          [payload.userId]: payload.feed,
        },
      }
    }
    case SIGNOUT: {
      return initialState
    }
    default:
      return state
  }
}
