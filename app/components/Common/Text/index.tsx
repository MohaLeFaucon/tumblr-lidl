import * as React from 'react'
import { Text as RNText, TextProps } from 'react-native'

import { ThemeContextInterface, withTheme } from '../../../theme'

type TextType = 'title' | 'body'

type BaseProps = TextProps & {
  type: TextType
  textStyle?: AppTypes.TextStyle,
}

interface Props extends BaseProps, ThemeContextInterface {}

const getFontSizeFromTextType = (type: TextType) => {
  switch (type) {
    case 'body': {
      return 13
    }
    case 'title': {
      return 15
    }
  }
}

const Text = ({
  style,
  theme,
  type,
  textStyle = 'default',
  ...props
}: Props) => (
  <RNText
    style={[
      style,
      {
        color: theme.main.textColor[textStyle],
        fontSize: getFontSizeFromTextType(type),
      },
    ]}
    {...props}
  />
)

export default withTheme<BaseProps>(Text)
