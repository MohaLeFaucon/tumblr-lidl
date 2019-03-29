import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import {
  StyleProp,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native'
import { IconProps } from 'react-native-vector-icons/Icon'
import { ThemeContextInterface, withTheme } from '../../../theme'

interface BaseProps extends TouchableWithoutFeedbackProps {
  iconName: string
  iconSize?: number
  iconColor?: string
  style?: StyleProp<ViewStyle>
  iconComponent?: React.ComponentType<IconProps>
  useTheme?: boolean
}

interface Props extends ThemeContextInterface, BaseProps {}

const TouchableIcon = ({
  iconName,
  iconSize = 28,
  iconColor,
  style,
  iconComponent: IconComp = Ionicons,
  useTheme = true,
  theme,
  ...props
}: Props) => (
  <TouchableWithoutFeedback
    hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
    {...props}
  >
    <View style={style}>
      <IconComp
        name={iconName}
        size={iconSize}
        color={
          useTheme ? (iconColor ? iconColor : theme.main.icons) : iconColor
        }
      />
    </View>
  </TouchableWithoutFeedback>
)

export default withTheme<BaseProps>(TouchableIcon)
