import * as React from 'react'
import { AsyncStorage, StatusBar } from 'react-native'

interface ThemeVariables {
  main: {
    backgroundColor: string
    textColor: { [key in AppTypes.TextStyle]: string }
    borders: string
    icons: string,
  }
  buttons: {
    [key in AppTypes.ButtonTypes]: {
      backgroundColor: string
      textColor: string,
    }
  }
  tabBar: {
    backgroundColor: string
    icons: {
      active: string
      inactive: string,
    },
  }
  header: {
    backgroungColor: string
    color: string,
  }
  lists: {
    separators: {
      sections: {
        backgroundColor: string,
      }
      items: {
        backgroundColor: string,
      },
    }
    items: {
      backgroundColor: string,
    },
  }
  inputs: {
    backgroundColor: string
    textColor: string
    placeholderColor: string,
  }
}

export type ThemeType = 'light' | 'dark'

type Theme = { [key in ThemeType]: ThemeVariables }

const themeVariables: Theme = {
  light: {
    main: {
      backgroundColor: '#DFDFDF',
      textColor: {
        default: '#000',
        error: '#DA595A',
      },
      borders: '#878787',
      icons: '#000',
    },
    buttons: {
      success: {
        backgroundColor: '#76E29F',
        textColor: '#fff',
      },
      info: {
        backgroundColor: '#577ED9',
        textColor: '#fff',
      },
      default: {
        backgroundColor: '#C7C7C7',
        textColor: '#000',
      },
      error: {
        backgroundColor: '#DA595A',
        textColor: '#fff',
      },
    },
    tabBar: {
      backgroundColor: '#fff',
      icons: {
        active: '#000',
        inactive: '#ccc',
      },
    },
    header: {
      backgroungColor: '#fff',
      color: '#000',
    },
    lists: {
      separators: {
        sections: {
          backgroundColor: '#E7E7E7',
        },
        items: {
          backgroundColor: '#ccc',
        },
      },
      items: {
        backgroundColor: '#F7F7F7',
      },
    },
    inputs: {
      backgroundColor: '#E7E7E7',
      textColor: '#000',
      placeholderColor: '#A7A7A7',
    },
  },
  dark: {
    main: {
      backgroundColor: '#353535',
      textColor: {
        default: '#fff',
        error: '#DA595A',
      },
      borders: '#CFCFCF',
      icons: '#fff',
    },
    buttons: {
      success: {
        backgroundColor: '#76E29F',
        textColor: '#fff',
      },
      info: {
        backgroundColor: '#577ED9',
        textColor: '#fff',
      },
      default: {
        backgroundColor: '#5E5E5E',
        textColor: '#fff',
      },
      error: {
        backgroundColor: '#DA595A',
        textColor: '#fff',
      },
    },
    tabBar: {
      backgroundColor: '#5E5E5E',
      icons: {
        active: '#FFF',
        inactive: '#BFBFBF',
      },
    },
    header: {
      backgroungColor: '#5E5E5E',
      color: '#fff',
    },
    lists: {
      separators: {
        sections: {
          backgroundColor: '#727779',
        },
        items: {
          backgroundColor: '#3F3F3F',
        },
      },
      items: {
        backgroundColor: '#535353',
      },
    },
    inputs: {
      backgroundColor: '#5E5E5E',
      textColor: '#fff',
      placeholderColor: '#E7E7E7',
    },
  },
}

export interface ThemeContextInterface {
  theme: ThemeVariables
  toggleTheme: () => any
  themeName: ThemeType
}

export const ThemeContext: React.Context<
  ThemeContextInterface
> = React.createContext<ThemeContextInterface>({
  theme: themeVariables.light,
  toggleTheme: () => null,
  themeName: 'dark',
})

interface State {
  theme: ThemeType
}

interface Props {
  children: React.ReactChild | React.ReactChildren
  theme: ThemeType
}

export default class ThemeProvider extends React.Component<Props, State> {
  state: State = {
    theme: this.props.theme,
  }

  toggleTheme = () => {
    this.setState(
      (state: State) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      }),
      async () => {
        await AsyncStorage.setItem('theme', this.state.theme)
      },
    )
  }

  render() {
    const { theme } = this.state
    const { children } = this.props

    return (
      <ThemeContext.Provider
        value={{
          theme: themeVariables[theme],
          toggleTheme: this.toggleTheme,
          themeName: theme,
        }}
      >
        <StatusBar
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        />
        {children}
      </ThemeContext.Provider>
    )
  }
}
