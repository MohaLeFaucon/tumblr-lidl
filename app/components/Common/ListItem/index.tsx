import * as React from 'react'
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'
import { ThemeContextInterface, withTheme } from '../../../theme'

interface BaseProps extends TouchableOpacityProps {
  style: StyleProp<ViewStyle>
  // tslint:disable-next-line
  children: React.ReactElement<any> | Array<React.ReactElement<any>>
}

interface Props extends BaseProps, ThemeContextInterface {}

const ListItem = ({ style, theme, children, ...props }: Props) => (
  <TouchableOpacity {...props} activeOpacity={0.75}>
    <View
      style={[style, { backgroundColor: theme.lists.items.backgroundColor }]}
    >
      {children}
    </View>
  </TouchableOpacity>
)

export default withTheme<BaseProps>(ListItem)
