import * as React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import {
  createStackNavigator,
  NavigationActions,
  NavigationScreenProps,
  StackActions,
} from 'react-navigation'

import { ImageTransition } from '../components/Common'
import {
  FillUserProfileContainer,
  LoginContainer,
  RegisterContainer,
} from '../containers'
import { Images } from '../resources'
import Routes from './Routes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesTransition: {
    ...StyleSheet.absoluteFillObject,
  },
  navContainer: {
    flex: 1,
  },
})

const images = Images.authImages

const Authentication = createStackNavigator(
  {
    [Routes.LOGIN]: LoginContainer,
    [Routes.REGISTER]: RegisterContainer,
    [Routes.USER_PROFILE_DATA]: FillUserProfileContainer,
  },
  {
    // @ts-ignore
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: Routes.LOGIN,
    cardStyle: {
      backgroundColor: 'transparent',
    },
    transparentCard: true,
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent',
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const width = layout.initWidth
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, -width],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateX }] }
      },
    }),
  },
)

interface Props extends NavigationScreenProps {
  didFillUserProfile: boolean
  isConnected: boolean
}

export default class AuthenticationNav extends React.Component<Props> {
  static router = Authentication.router

  componentDidMount() {
    const { didFillUserProfile, navigation, isConnected } = this.props

    if (!didFillUserProfile && isConnected) {
      const action = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: Routes.USER_PROFILE_DATA }),
        ],
      })
      navigation.dispatch(action)
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { isConnected, navigation } = this.props

    if (prevProps.isConnected && !isConnected) {
      navigation.navigate(Routes.LOGIN)
    }
  }

  render() {
    const { didFillUserProfile, isConnected, ...props } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.imagesTransition}>
          <ImageTransition images={images} />
        </View>
        <SafeAreaView style={styles.navContainer}>
          <Authentication {...props} />
        </SafeAreaView>
      </View>
    )
  }
}
