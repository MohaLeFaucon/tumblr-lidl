import {
  FILL_USER_PROFILE_SUCCESS,
  FillUserProfileSuccessAction,
  LOGIN_SUCCESS,
  LoginSuccessAction,
  REGISTER_ERROR,
  RegisterErrorAction,
  SET_USER_ID,
  SetUserIdAction,
  SIGNOUT,
  SignoutSuccessAction,
  SUBSCRIBE_TO_USER,
  SubscribeToUserSuccessAction,
  UNSUBSCRIBE_TO_USER,
  UnsubscribeToUserSuccessAction,
} from '../actionTypes/authentication'

export interface AuthenticationState {
  userId?: string
  isConnected: boolean
  registration: {
    errorMessage?: string,
  }
  userData: AppTypes.User
}

const initialState: AuthenticationState = {
  userId: undefined,
  isConnected: false,
  registration: {
    errorMessage: undefined,
  },
  userData: {
    username: '',
    avatarUrl: null,
    subscribers: [],
    subscribing: [],
    id: '',
  },
}

type Action =
  | LoginSuccessAction
  | FillUserProfileSuccessAction
  | RegisterErrorAction
  | SetUserIdAction
  | SignoutSuccessAction
  | SubscribeToUserSuccessAction
  | UnsubscribeToUserSuccessAction

export default function authenticationReducer(
  state: AuthenticationState = initialState,
  action: Action,
): AuthenticationState {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { userData } = action.payload

      return {
        ...state,
        userData,
        userId: userData.id,
        isConnected: true,
      }
    }
    case FILL_USER_PROFILE_SUCCESS: {
      const { username, avatarUrl } = action.payload

      return {
        ...state,
        userData: {
          ...state.userData,
          username,
          avatarUrl,
        },
      }
    }
    case REGISTER_ERROR: {
      const { errorMessage } = action.payload

      return {
        ...state,
        registration: {
          errorMessage,
        },
      }
    }
    case SET_USER_ID: {
      const { userId } = action.payload

      return {
        ...state,
        userId,
      }
    }
    case SIGNOUT: {
      return initialState
    }
    case SUBSCRIBE_TO_USER: {
      const { userId } = action.payload

      return {
        ...state,
        userData: {
          ...state.userData,
          subscribing: [...(state.userData.subscribing || []), userId],
        },
      }
    }
    case UNSUBSCRIBE_TO_USER: {
      const { userId } = action.payload

      return {
        ...state,
        userData: {
          ...state.userData,
          subscribing: (state.userData.subscribing || []).filter(
            (sub) => sub !== userId,
          ),
        },
      }
    }
    default:
      return state
  }
}
