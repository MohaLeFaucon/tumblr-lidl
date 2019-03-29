import * as firebase from 'firebase'
import * as React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationActions,
} from 'react-navigation'

import TabBar, { TabBarIcon } from '../components/TabBar'
import UsersSearch from '../components/UsersSearch'
import {
  CommentsContainer,
  HomeContainer,
  LikesContainer,
  SettingsContainer,
  UserFeedContainer,
} from '../containers'
import configureStore from '../redux/store/configureStore'
import Routes from './Routes'

const MainStack = createStackNavigator(
  {
    [Routes.PICS_LIST]: HomeContainer,
    [Routes.LIKES_MENTIONS]: LikesContainer,
    [Routes.COMMENTS]: CommentsContainer,
    [Routes.USER_FEED]: UserFeedContainer,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon name="md-home" size={30} focused={focused} />
      ),
    },
  },
)

const SettingsStack = createStackNavigator(
  {
    [Routes.SETTINGS]: SettingsContainer,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon name="md-settings" size={30} focused={focused} />
      ),
    },
  },
)

const CameraStack = createStackNavigator(
  {
    None: () => null,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => (
        <TabBarIcon name="md-add" size={30} focused={focused} />
      ),
      tabBarOnPress: () => navigation.navigate(Routes.CAMERA),
    }),
  },
)

const UsersSearchStack = createStackNavigator(
  {
    [Routes.SEARCH_USER]: UsersSearch,
    [Routes.USER_FEED]: UserFeedContainer,
    [Routes.LIKES_MENTIONS]: LikesContainer,
    [Routes.COMMENTS]: CommentsContainer,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => (
        <TabBarIcon name="md-search" size={30} focused={focused} />
      ),
    }),
  },
)

const UserFeedStack = createStackNavigator(
  {
    [Routes.USER_FEED]: UserFeedContainer,
    [Routes.LIKES_MENTIONS]: LikesContainer,
    [Routes.COMMENTS]: CommentsContainer,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => (
        <TabBarIcon name="md-person" size={30} focused={focused} />
      ),
      tabBarOnPress: () => {
        navigation.dispatch(
          NavigationActions.navigate({
            routeName: Routes.USER_FEED_STACK,
            action: NavigationActions.navigate({
              routeName: Routes.USER_FEED,
              params: {
                userId: firebase.auth().currentUser!.uid,
                user: configureStore.store.getState().user.userData,
              },
            }),
          }),
        )
      },
    }),
  },
)

const MainNavigator = createBottomTabNavigator(
  {
    [Routes.MAIN_LIST]: MainStack,
    [Routes.SEARCH_USER_STACK]: UsersSearchStack,
    [Routes.CAMERA_STACK]: CameraStack,
    [Routes.USER_FEED_STACK]: UserFeedStack,
    [Routes.SETTINGS_STACK]: SettingsStack,
  },
  // @ts-ignore
  {
    tabBarOptions: {
      showLabel: false,
    },
    tabBarComponent: TabBar,
  },
)

export default MainNavigator
