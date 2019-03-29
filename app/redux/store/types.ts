import { PersistPartial } from 'redux-persist'
import { AuthenticationState } from '../reducers/authentication'
import { FeedState } from '../reducers/feed'

export interface AppState {
  user: AuthenticationState & PersistPartial
  feed: FeedState & PersistPartial
}
