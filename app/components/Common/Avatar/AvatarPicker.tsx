import {
  ActionSheetProps,
  connectActionSheet,
} from '@expo/react-native-action-sheet'
import { ImagePicker, Permissions } from 'expo'
import * as React from 'react'
import { Alert, TouchableWithoutFeedback, View } from 'react-native'

import i18n from '../../../i18n'
import Avatar, { AvatarProps } from './Avatar'

interface BaseProps extends AvatarProps {
  onChange?: (uri: string) => any
  disabled?: boolean
}

interface Props extends BaseProps, ActionSheetProps {}

interface State extends Pick<AvatarProps, 'source'> {}

class AvatarPicker extends React.PureComponent<Props, State> {
  state: State = {
    source: this.props.source,
  }

  getPermission = async (permission: Permissions.PermissionType) => {
    const { status } = await Permissions.getAsync(permission)
    if (status !== 'granted') {
      const { status: askStatus } = await Permissions.askAsync(permission)
      if (askStatus !== 'granted') {
        throw new Error()
      }
    }
  }

  onAvatarChanged = (uri: string) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(uri)
    }
    this.setState((state: State) => ({
      ...state,
      source: { uri },
    }))
  }

  pickImageFromCamera = async () => {
    try {
      await this.getPermission(Permissions.CAMERA)
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        base64: false,
      })

      if (!result.cancelled) {
        this.onAvatarChanged(result.uri)
      }
    } catch (e) {
      Alert.alert(
        i18n.t('shared.alerts.error.title'),
        i18n.t('shared.alerts.permissions.camera'),
      )
    }
  }

  pickImageFromLibrary = async () => {
    try {
      await this.getPermission(Permissions.CAMERA_ROLL)
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: false,
        mediaTypes: 'Images',
      })

      if (!result.cancelled) {
        this.onAvatarChanged(result.uri)
      }
    } catch (e) {
      Alert.alert(
        i18n.t('shared.alerts.error.title'),
        i18n.t('shared.alerts.permissions.cameraRoll'),
      )
    }
  }

  openImagePicker = () => {
    const { showActionSheetWithOptions } = this.props
    const options = ['Open camera', 'Open Library', 'Cancel']
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.pickImageFromCamera()
        } else if (buttonIndex === 1) {
          this.pickImageFromLibrary()
        }
      },
    )
  }

  render() {
    const { size, disabled = false } = this.props
    const { source } = this.state

    return (
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={this.openImagePicker}
      >
        <View>
          <Avatar source={source} size={size} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connectActionSheet<BaseProps>(AvatarPicker)
