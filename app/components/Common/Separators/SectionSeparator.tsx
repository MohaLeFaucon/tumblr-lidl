import * as React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { ThemeContextInterface, withTheme } from '../../../theme'

type BaseProps = ViewProps

interface Props extends BaseProps, ThemeContextInterface {}

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
})

const SectionSeparator = ({ style, theme, ...props }: Props) => (
  <View
    style={[
      style,
      styles.separator,
      {
        backgroundColor: theme.lists.separators.sections.backgroundColor,
      },
    ]}
    {...props}
  />
)

export default withTheme<BaseProps>(SectionSeparator)
