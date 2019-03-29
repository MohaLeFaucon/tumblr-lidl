export declare type LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS'
export const LOGIN_IN_PROGRESS: LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS'

export declare type LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_SUCCESS: LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export declare type LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_ERROR: LOGIN_ERROR = 'LOGIN_ERROR'

export declare type REGISTER_IN_PROGRESS = 'REGISTER_IN_PROGRESS'
export const REGISTER_IN_PROGRESS: REGISTER_IN_PROGRESS = 'REGISTER_IN_PROGRESS'

export declare type REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_SUCCESS: REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export declare type REGISTER_ERROR = 'REGISTER_ERROR'
export const REGISTER_ERROR: REGISTER_ERROR = 'REGISTER_ERROR'

export declare type FILL_USER_PROFILE_SUCCESS = 'FILL_USER_PROFILE_SUCCESS'
export const FILL_USER_PROFILE_SUCCESS = 'FILL_USER_PROFILE_SUCCESS'

export declare type FILL_USER_PROFILE_ERROR = 'FILL_USER_PROFILE_ERROR'
export const FILL_USER_PROFILE_ERROR = 'FILL_USER_PROFILE_ERROR'

export declare type SET_USER_ID = 'SET_USER_ID'
export const SET_USER_ID = 'SET_USER_ID'

export declare type SIGNOUT = 'SIGNOUT'
export const SIGNOUT: SIGNOUT = 'SIGNOUT'

export declare type SUBSCRIBE_TO_USER = 'SUBSCRIBE_TO_USER'
export const SUBSCRIBE_TO_USER: SUBSCRIBE_TO_USER = 'SUBSCRIBE_TO_USER'

export declare type UNSUBSCRIBE_TO_USER = 'UNSUBSCRIBE_TO_USER'
export const UNSUBSCRIBE_TO_USER: UNSUBSCRIBE_TO_USER = 'UNSUBSCRIBE_TO_USER'

export interface LoginSuccessAction {
  readonly type: LOGIN_SUCCESS
  readonly payload: {
    userData: AppTypes.User,
  }
}

export interface FillUserProfileSuccessAction {
  readonly type: FILL_USER_PROFILE_SUCCESS
  readonly payload: {
    username: string
    avatarUrl: string | null,
  }
}

export interface RegisterErrorAction {
  readonly type: REGISTER_ERROR
  readonly payload: {
    errorMessage: string,
  }
}

export interface SetUserIdAction {
  readonly type: SET_USER_ID
  readonly payload: {
    userId: string,
  }
}

export interface SignoutSuccessAction {
  readonly type: SIGNOUT
}

export interface SubscribeToUserSuccessAction {
  readonly type: SUBSCRIBE_TO_USER
  readonly payload: {
    userId: string,
  }
}

export interface UnsubscribeToUserSuccessAction {
  readonly type: UNSUBSCRIBE_TO_USER
  readonly payload: {
    userId: string,
  }
}
