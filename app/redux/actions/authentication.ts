import { Constants } from 'expo'
import * as firebase from 'firebase'
import { Alert, AsyncStorage } from 'react-native'
import { ActionCreator, AnyAction, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { Authentication, Storage, User } from '../../api'
import NavigationService from '../../helpers/NavigationService'
import i18n from '../../i18n'
import Routes from '../../routes/Routes'
import {
  FILL_USER_PROFILE_ERROR,
  FILL_USER_PROFILE_SUCCESS,
  FillUserProfileSuccessAction,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LoginSuccessAction,
  REGISTER_ERROR,
  RegisterErrorAction,
  SET_USER_ID,
  SetUserIdAction,
  SIGNOUT,
  SUBSCRIBE_TO_USER,
  SubscribeToUserSuccessAction,
  UNSUBSCRIBE_TO_USER,
  UnsubscribeToUserSuccessAction,
} from '../actionTypes'
import { AppState } from '../store/types'

type AsyncAction<T = any> = ActionCreator<
  ThunkAction<Promise<T>, AppState, null, AnyAction>
>

export type SignupAction = AsyncAction
export type SigninAction = AsyncAction<{ navigateToMain: boolean }>
export type FillUserProfileAction = AsyncAction
export type SignoutAction = AsyncAction
export type SubscribeAction = AsyncAction
export type UnsubscribeAction = AsyncAction

interface SignupActionParams {
  email: string
  password: string
}

interface FillUserProfileActionParams {
  username: string
  avatarFilePath?: string
}

export const signupAction: SignupAction = ({
  email,
  password,
}: SignupActionParams) => async (dispatch) => {
  try {
    const userData: firebase.auth.UserCredential = await Authentication.signup({
      email,
      password,
    })
    await Promise.all([
      AsyncStorage.setItem('userId', userData.user!.uid),
      User.createUser(userData.user!.uid),
    ])
    const user = await User.getUserByUserId(userData.user!.uid)
    dispatch(loginSuccess(user.data() as AppTypes.User, user.id))
    NavigationService.navigate(Routes.USER_PROFILE_DATA)
  } catch (error) {
    dispatch(signupError(error))
    throw error
  }
}

export const signinAction: SigninAction = ({
  email,
  password,
}: SignupActionParams) => async (dispatch) => {
  try {
    const userData: firebase.auth.UserCredential = await Authentication.signin({
      email,
      password,
    })
    const user = await User.getUserByUserId(userData.user!.uid)
    await AsyncStorage.multiSet([
      ['userId', userData.user!.uid],
      [
        'userData',
        JSON.stringify({
          username: userData.user!.displayName,
          avatarUrl: userData.user!.photoURL,
        }),
      ],
    ])
    dispatch(loginSuccess(user.data() as AppTypes.User, user.id))
    return {
      navigateToMain: (userData.user!.displayName &&
        userData.user!.displayName!.length > 0) as boolean,
    }
  } catch (error) {
    dispatch(loginError(error))
    throw error
  }
}

export const fillUserProfileAction: FillUserProfileAction = ({
  username,
  avatarFilePath,
}: FillUserProfileActionParams) => async (
  dispatch: Dispatch,
  getState: () => AppState,
) => {
  try {
    let avatarUrl: string | null = null
    if (avatarFilePath) {
      avatarUrl = await Storage.uploadFile(
        `${Date.now()}_${Constants.sessionId}`,
        avatarFilePath,
      )
    }
    await Promise.all([
      User.updateProfile({
        username,
        avatarUrl,
      }),
      User.updateUser({
        username,
        avatarUrl,
        userId: firebase.auth().currentUser!.uid,
      }),
    ])
    dispatch(fillProfileSuccess({ username, avatarUrl }))
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({ username, avatarUrl }),
    )
  } catch (e) {
    dispatch(fillProfileError(e))
    throw e
  }
}

export const signoutAction: SignoutAction = () => async (
  dispatch: Dispatch,
) => {
  try {
    await Authentication.signout()
    await AsyncStorage.multiRemove(['userId', 'userData'])
    dispatch(signoutSuccess())
  } catch (e) {
    Alert.alert(
      i18n.t('shared.alerts.error.title'),
      i18n.t('shared.alerts.signoutFail'),
    )
  }
}

const signupError = (error: firebase.FirebaseError): RegisterErrorAction => ({
  type: REGISTER_ERROR,
  payload: {
    errorMessage: error.message,
  },
})

const loginSuccess = (
  userInfo: AppTypes.User,
  id: string,
): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: {
    userData: {
      id,
      ...userInfo,
      subscribers: userInfo.subscribers || [],
      subscribing: userInfo.subscribing || [],
    },
  },
})

const loginError = (error: firebase.FirebaseError) => ({
  type: LOGIN_ERROR,
  payload: {
    errorMessage: error.message,
  },
})

const fillProfileSuccess = (userData: {
  username: string
  avatarUrl: string | null,
}): FillUserProfileSuccessAction => ({
  type: FILL_USER_PROFILE_SUCCESS,
  payload: userData,
})

const fillProfileError = (error: firebase.FirebaseError) => ({
  type: FILL_USER_PROFILE_ERROR,
  payload: {
    error,
  },
})

export const setUserId = (userId: string): SetUserIdAction => ({
  type: SET_USER_ID,
  payload: {
    userId,
  },
})

const signoutSuccess = () => ({
  type: SIGNOUT,
})

export const subscribeToUser: SubscribeAction = (userId: string) => async (
  dispatch: Dispatch,
) => {
  await User.subscribeToUser(userId)
  dispatch(subscribeToUserSuccess(userId))
}

const subscribeToUserSuccess = (
  userId: string,
): SubscribeToUserSuccessAction => ({
  type: SUBSCRIBE_TO_USER,
  payload: {
    userId,
  },
})

export const unsubscribeToUser: UnsubscribeAction = (userId: string) => async (
  dispatch: Dispatch,
) => {
  await User.unsubscribeToUser(userId)
  dispatch(unsubscribeToUserSuccess(userId))
}

const unsubscribeToUserSuccess = (
  userId: string,
): UnsubscribeToUserSuccessAction => ({
  type: UNSUBSCRIBE_TO_USER,
  payload: {
    userId,
  },
})
