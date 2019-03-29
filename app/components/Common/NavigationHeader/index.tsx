import * as React from 'react'
import { Header, HeaderProps } from 'react-navigation'
import { ThemeContextInterface, withTheme } from '../../../theme'

type BaseProps = HeaderProps & {
  title?: string,
}

interface Props extends BaseProps, ThemeContextInterface {}

const NavigationHeader = ({ scene, theme, title, ...props }: Props) => (
  <Header
    scene={{
      ...scene,
      descriptor: {
        ...scene.descriptor,
        options: {
          ...scene.descriptor.options,
          headerTitleStyle: {
            color: theme.header.color,
          },
          headerStyle: [
            scene.descriptor.options.headerStyle,
            { backgroundColor: theme.header.backgroungColor },
          ],
        },
      },
    }}
    {...props}
  />
)

export default withTheme<BaseProps>(NavigationHeader)
