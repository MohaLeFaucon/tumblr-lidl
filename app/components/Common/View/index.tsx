import * as React from 'react'
import { View as RNView, ViewProps } from 'react-native'

import { ThemeContextInterface, withTheme } from '../../../theme'

type BaseProps = ViewProps

interface Props extends ThemeContextInterface, BaseProps {}

const View = ({ style, theme, ...props }: Props) => (
  <RNView
    style={[style, { backgroundColor: theme.main.backgroundColor }]}
    {...props}
  />
)

export default withTheme<BaseProps>(View)
