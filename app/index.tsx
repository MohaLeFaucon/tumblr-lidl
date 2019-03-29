import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { AppLoading, Asset } from 'expo'
import * as firebase from 'firebase'
import * as React from 'react'
import { AsyncStorage, Image, UIManager } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './redux/store/configureStore'
// tslint:disable-next-line
import RootNavigation from './routes'
import { ThemeProvider, ThemeType } from './theme'

import './firebase'
import { setupI18n } from './i18n'
import { setUserId } from './redux/actions/authentication'
import { Images } from './resources'

const { store, persistor } = configureStore

// tslint:disable-next-line
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

type AssetImage = string | number

interface State {
  isReady: boolean
  isLogged: boolean
  didFillUserProfile: boolean
  theme: ThemeType
}

const cacheImages = (images: AssetImage[]) =>
  Promise.all(
    images.map((image: AssetImage) => {
      if (typeof image === 'string') {
        return Image.prefetch(image)
      }
      return Asset.fromModule(image).downloadAsync()
    }),
  )

class App extends React.Component<{}, State> {
  state: State = {
    isReady: false,
    isLogged: false,
    didFillUserProfile: false,
    theme: 'dark',
  }

  setIsReady = async () => {
    // await AsyncStorage.clear()
    const [isLogged, theme] = await AsyncStorage.multiGet(['userId', 'theme'])
    if (isLogged[1]) {
      store.dispatch(setUserId(isLogged[1]))
    }
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isReady: true,
        isLogged: !!user,
        didFillUserProfile: !!(user && user.displayName),
        theme: (theme[1] as ThemeType) || 'dark',
      })
    })
  }

  startAsyncLoading = async () => {
    const images = Object.values(Images).reduce(
      (acc: AssetImage[], val: AssetImage) => [
        ...acc,
        ...(Array.isArray(val) ? val : [val]),
      ],
      [],
    )

    await setupI18n()
    await cacheImages(images)
  }

  render(): React.ReactNode {
    const { isReady, isLogged, didFillUserProfile, theme } = this.state

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.startAsyncLoading}
          onFinish={this.setIsReady}
        />
      )
    }
    return (
      <ActionSheetProvider>
        <ThemeProvider theme={theme}>
          <RootNavigation
            isLogged={isLogged}
            didFillUserProfile={didFillUserProfile}
          />
        </ThemeProvider>
      </ActionSheetProvider>
    )
  }
}

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
)
