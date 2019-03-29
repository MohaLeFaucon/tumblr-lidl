import { AppState } from '../store/types'

export const isSubscribedToUser = (state: AppState, userId: string) => {
  return state.user.userData.subscribing.includes(userId)
}
