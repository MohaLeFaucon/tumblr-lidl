import * as React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
// tslint:disable-next-line:import-name
import SafeAreaView from 'react-native-safe-area-view'
import {
  NavigationParams,
  NavigationRoute,
  TabBarBottomProps,
} from 'react-navigation'
import { ThemeContextInterface, withTheme } from '../../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 49,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface BaseProps extends TabBarBottomProps {
  onTabPress: ({ route }: { route: NavigationRoute<NavigationParams> }) => any
}

interface Props extends ThemeContextInterface, BaseProps {}

class TabBar extends React.Component<Props> {
  renderIcon = ({
    route,
    focused,
    index,
  }: {
    route: NavigationRoute<NavigationParams>
    focused: boolean
    index: number,
  }): React.ReactNode => {
    const { renderIcon } = this.props

    return renderIcon({
      focused,
      route,
      index,
    })
  }

  render(): React.ReactNode {
    const {
      theme: { tabBar },
      navigation,
      onTabPress,
    } = this.props
    const { routes } = navigation.state

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: tabBar.backgroundColor }]}
      >
        {routes.map((route, index) => {
          const focused = index === navigation.state.index
          const scene = { focused, route, index }

          return (
            <TouchableWithoutFeedback
              key={route.key}
              // tslint:disable-next-line:jsx-no-lambda
              onPress={() => onTabPress({ route })}
              hitSlop={{ left: 15, right: 15, top: 5, bottom: 5 }}
            >
              <View style={styles.tab}>{this.renderIcon(scene)}</View>
            </TouchableWithoutFeedback>
          )
        })}
      </SafeAreaView>
    )
  }
}

export default withTheme<BaseProps>(TabBar)
