import * as React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native'

import { ThemeContextInterface, withTheme } from '../../../theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 3,
  },
})

interface BaseProps extends TouchableHighlightProps {
  type: AppTypes.ButtonTypes
  title?: string
  loading?: boolean
}

interface Props extends ThemeContextInterface, BaseProps {}

const Button = ({
  style,
  type,
  title,
  theme,
  disabled,
  loading,
  themeName,
  ...props
}: Props) => (
  <TouchableHighlight
    activeOpacity={0.4}
    underlayColor={theme.buttons[type].backgroundColor}
    disabled={disabled}
    style={[
      styles.container,
      style,
      {
        backgroundColor: theme.buttons[type].backgroundColor,
        opacity: disabled ? 0.75 : 1,
      },
    ]}
    {...props}
  >
    <View>
      {!loading && (
        <Text style={{ color: theme.buttons[type].textColor }}>{title}</Text>
      )}
      {loading && (
        <ActivityIndicator
          size="small"
          color={themeName === 'dark' ? '#F7F7F7' : '#5E5E5E'}
        />
      )}
    </View>
  </TouchableHighlight>
)

export default withTheme<BaseProps>(Button)
