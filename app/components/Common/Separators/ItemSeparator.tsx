import * as React from 'react'
import { View, ViewProps } from 'react-native'
import { ThemeContextInterface, withTheme } from '../../../theme'

type BaseProps = ViewProps

interface Props extends BaseProps, ThemeContextInterface {}

const ItemSeparator = ({ style, theme, ...props }: Props) => (
  <View
    style={[
      style,
      { backgroundColor: theme.lists.separators.items.backgroundColor },
    ]}
    {...props}
  />
)

export default withTheme<BaseProps>(ItemSeparator)
