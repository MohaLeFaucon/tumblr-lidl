import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import { Persistor, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'

import { feed, user } from '../reducers'
import { AppState } from './types'

const middlewares = [reduxThunk]
// eslint-disable-next-line no-undef
if (__DEV__) {
  middlewares.push(logger as any)
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user: persistReducer({ storage, key: 'user' }, user),
  feed: persistReducer({ storage, key: 'feed' }, feed),
})

interface ConfigureStore {
  store: Store<AppState>
  persistor: Persistor
}

const configureStore = (): ConfigureStore => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore()
