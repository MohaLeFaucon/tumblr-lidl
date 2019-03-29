import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { IconProps } from 'react-native-vector-icons/Icon'

import { ThemeContextInterface, withTheme } from '../../theme'

interface BaseProps extends IconProps {
  focused: boolean
}

interface Props extends BaseProps, ThemeContextInterface {}

const TabBarIcon = ({ focused, theme, ...props }: Props) => (
  <Ionicons
    {...props}
    color={focused ? theme.tabBar.icons.active : theme.tabBar.icons.inactive}
  />
)

export default withTheme<BaseProps>(TabBarIcon)
