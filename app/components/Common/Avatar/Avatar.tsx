import * as React from 'react'
import { Image, ImageSourcePropType } from 'react-native'

export interface AvatarProps {
  size: number
  source: ImageSourcePropType
}

const Avatar = ({ size, source }: AvatarProps) => (
  <Image
    source={source}
    resizeMode="contain"
    style={{ width: size, height: size, borderRadius: size / 2 }}
  />
)

export default Avatar
