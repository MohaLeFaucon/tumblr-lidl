import * as React from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import i18n from '../../../i18n'
import Text from '../Text'
import TouchableIcon from '../TouchableIcon'

interface Props {
  url: string
  width: number
  height: number
}

interface State {
  isLoading: boolean
  error: boolean
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default class FeedImage extends React.PureComponent<Props, State> {
  state: State = {
    isLoading: false,
    error: false,
  }

  imageRef = React.createRef<Image>()

  onLoadStart = () => {
    this.setState({ isLoading: true })
  }

  onLoadEnd = () => {
    this.setState({ isLoading: false })
  }

  onError = () => {
    this.setState({ error: true })
  }

  render(): React.ReactNode {
    const { url, width, height } = this.props
    const { isLoading, error } = this.state
    const aspectRatio = width / height

    return (
      <View style={styles.container}>
        <Image
          ref={this.imageRef}
          source={{ uri: url }}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          onError={this.onError}
          style={{
            aspectRatio,
            width: '100%',
          }}
        />
        {(isLoading || error) && (
          <View style={styles.loaderContainer}>
            {isLoading && <ActivityIndicator color="#B7B7B7" />}
            {!isLoading && error && (
              <React.Fragment>
                <TouchableIcon iconName="md-sad" iconSize={50} />
                <Text type="title">{i18n.t('shared.image.loadError')}</Text>
              </React.Fragment>
            )}
          </View>
        )}
      </View>
    )
  }
}
