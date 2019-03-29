import {
  NavigationAction,
  NavigationActions,
  NavigationContainerComponent,
  NavigationNavigateAction,
  NavigationParams,
  StackActions,
} from 'react-navigation'

let navigator: NavigationContainerComponent

const setTopLevelNavigator = (navigatorRef: NavigationContainerComponent) => {
  navigator = navigatorRef
}

const getNavigationAction = (routeName: string, params?: NavigationParams) =>
  NavigationActions.navigate({
    routeName,
    params,
  })

const navigate = (routeName: string, params?: NavigationParams) => {
  navigator.dispatch(getNavigationAction(routeName, params))
}

const reset = (
  actions: NavigationNavigateAction[] = [],
  key: string | null = null,
) => {
  navigator.dispatch(
    StackActions.reset({
      actions,
      key,
      index: 0,
    }),
  )
}

const dispatch = (action: NavigationAction) => navigator.dispatch(action)

export default {
  navigate,
  setTopLevelNavigator,
  reset,
  getNavigationAction,
  dispatch,
}
