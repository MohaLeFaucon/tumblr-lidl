import * as React from 'react'
import {
  // @ts-ignore
  createAppContainer,
  createStackNavigator,
  NavigationComponent,
  NavigationContainerComponent,
  NavigationScreenProps,
} from 'react-navigation'

import PictureUpload from '../components/PictureUpload'
import NavigationService from '../helpers/NavigationService'
import Authentication from './Authentication'
import Main from './Main'
import Routes from './Routes'

interface MainProps {
  isLogged: boolean
  didFillUserProfile: boolean
}

const MainNavigator = ({
  isLogged,
  didFillUserProfile,
}: MainProps): NavigationComponent => {
  const Auth = (props: NavigationScreenProps) => (
    <Authentication
      {...props}
      didFillUserProfile={didFillUserProfile}
      isConnected={isLogged}
    />
  )

  Auth.router = Authentication.router

  const Nav = createStackNavigator(
    {
      [Routes.AUTHENTICATION]: Auth,
      [Routes.MAIN]: Main,
      [Routes.CAMERA]: PictureUpload,
    },
    {
      initialRouteName: isLogged
        ? didFillUserProfile
          ? Routes.MAIN
          : Routes.AUTHENTICATION
        : Routes.AUTHENTICATION,
      // @ts-ignore
      defaultNavigationOptions: {
        header: null,
      },
      mode: 'modal',
    },
  )

  const AppContainer = createAppContainer(Nav)
  return (
    <AppContainer
      ref={(ref: NavigationContainerComponent) =>
        NavigationService.setTopLevelNavigator(ref)
      }
    />
  )
}

interface Props {
  isLogged: boolean
  didFillUserProfile: boolean
}

const MainNav = ({ isLogged, didFillUserProfile }: Props) => (
  <MainNavigator isLogged={isLogged} didFillUserProfile={didFillUserProfile} />
)

export default MainNav
