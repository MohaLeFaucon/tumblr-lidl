import * as React from 'react'
import {
  Animated,
  ImageBackground,
  InteractionManager,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})

const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground,
)

type Image = string | number

interface Props {
  images: Image[]
  interval?: number
  transitionDuration?: number
}

interface State {
  imageIndex: number
  animateToNextImage: boolean
}

export default class ImageTransition extends React.PureComponent<Props, State> {
  static defaultProps = {
    images: [],
    interval: 5000,
    transitionDuration: 2500,
  }

  opacityAnimation = new Animated.Value(0)

  state: State = {
    imageIndex: 0,
    animateToNextImage: false,
  }

  imageInterval: number | null = null

  componentDidMount() {
    const { interval } = this.props
    this.imageInterval = setInterval(this.animateToNextImage, interval)
  }

  componentWillUnmount() {
    clearInterval(this.imageInterval!)
  }

  animateToNextImage = () => {
    const { transitionDuration } = this.props
    this.setState({ animateToNextImage: true })
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(this.opacityAnimation, {
        toValue: 1,
        duration: transitionDuration,
        useNativeDriver: true,
      }).start(() => {
        this.opacityAnimation.setValue(0)
        this.setState((state: State) => ({
          animateToNextImage: false,
          imageIndex: state.imageIndex + 1,
        }))
      })
    })
  }

  render() {
    const { images } = this.props
    const { animateToNextImage, imageIndex } = this.state
    const firstImageOpacity = this.opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
    const secondImageOpacity = this.opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    return (
      <React.Fragment>
        <AnimatedImageBackground
          source={images[imageIndex % images.length]}
          style={[styles.backgroundImage, { opacity: firstImageOpacity }]}
        />
        {animateToNextImage && (
          <AnimatedImageBackground
            source={images[(imageIndex + 1) % images.length]}
            style={[styles.backgroundImage, { opacity: secondImageOpacity }]}
          />
        )}
      </React.Fragment>
    )
  }
}
