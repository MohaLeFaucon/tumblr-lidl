import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'
import TouchableIcon from '../TouchableIcon'

interface Props {
  onPress: () => any
  scene: {
    index: number,
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
})

const NavigationHeaderLeft = ({ onPress, scene }: Props) =>
  scene.index !== 0 && (
    <TouchableIcon
      iconName={Platform.select({
        ios: 'ios-arrow-back',
        android: 'md-arrow-back',
      })}
      onPress={onPress}
      style={styles.container}
    />
  )

export default NavigationHeaderLeft
