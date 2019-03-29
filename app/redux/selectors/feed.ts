import { AppState } from '../store/types'

export const getLikesForPicture = (state: AppState, pictureId: string) => {
  return state.feed.likes[pictureId]
}

export const getCommentsForPicture = (
  state: AppState,
  pictureId: string,
): AppTypes.Comment[] => {
  return state.feed.comments[pictureId]
}

export const getUserFeed = (state: AppState, userId: string) => {
  return state.feed.usersFeed[userId] || []
}
