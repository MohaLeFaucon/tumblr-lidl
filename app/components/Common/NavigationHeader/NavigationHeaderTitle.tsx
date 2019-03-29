import * as React from 'react'
import { StyleProp, TextStyle } from 'react-native'
// @ts-ignore
import { HeaderTitle } from 'react-navigation'

import { ThemeContextInterface, withTheme } from '../../../theme'

interface BaseProps {
  style: StyleProp<TextStyle>
}

interface Props extends BaseProps, ThemeContextInterface {}

const NavigationHeaderTitle = ({ style, theme, ...props }: Props) => (
  <HeaderTitle {...props} style={[style, { color: theme.header.color }]} />
)

export default withTheme<BaseProps>(NavigationHeaderTitle)
