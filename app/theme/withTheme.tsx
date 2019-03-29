import * as React from 'react'

import { ThemeContext, ThemeContextInterface } from './Provider'

const withTheme = <P extends object>(
  Comp: React.ComponentType<
    P & ThemeContextInterface & { ref?: React.Ref<typeof Comp> }
  >,
) =>
  React.forwardRef((props: P, ref?: React.Ref<typeof Comp>) => (
    <ThemeContext.Consumer>
      {(theme: ThemeContextInterface) => (
        <Comp {...props} ref={ref} {...theme} />
      )}
    </ThemeContext.Consumer>
  ))

export default withTheme
