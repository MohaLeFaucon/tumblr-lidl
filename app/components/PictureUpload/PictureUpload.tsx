import {
  Camera,
  CameraObject,
  Haptic,
  ImageManipulator,
  ImagePicker,
  Permissions,
  PictureResponse,
} from 'expo'
import * as React from 'react'
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  View as RNView,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import i18n from '../../i18n'
import { Button, Text, View } from '../Common'
import PictureUploadActionButtons from './PictureUploadActionButtons'
import PictureUploadDialog from './PictureUploadDialog'

import { Storage } from '../../api'
import { resizeImage } from '../../helpers/utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#353535',
  },
  camera: {
    height: '50%',
  },
  placeholderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    textAlign: 'center',
  },
  askPermissionButton: {
    marginTop: 10,
  },
})

interface State {
  flashMode: string
  side: string
  hasCameraPermission: boolean
  didAskPermission: boolean
  canSnap: boolean
  showDialog: boolean
}

export default class PictureUpload extends React.Component<
  NavigationScreenProps,
  State
> {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  state: State = {
    flashMode: Camera.Constants.FlashMode.auto,
    side: Camera.Constants.Type.back,
    hasCameraPermission: false,
    didAskPermission: false,
    canSnap: true,
    showDialog: false,
  }

  cameraRef = React.createRef<CameraObject>()

  image: ImageManipulator.ImageResult | null = null

  componentDidMount = async () => {
    const { status: cameraStatus } = await Permissions.getAsync(
      Permissions.CAMERA,
    )
    if (cameraStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
        hasCameraPermission: status === 'granted',
        didAskPermission: true,
      })
    } else {
      this.setState({ hasCameraPermission: true, didAskPermission: true })
    }
  }

  openAppSettings = async () => {
    const supported = await Linking.canOpenURL('app-settings:')
    if (supported) {
      Linking.openURL('app-settings:')
    }
  }

  askLibraryPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      Alert.alert(
        i18n.t('shared.alerts.error.title'),
        i18n.t('shared.alerts.permissions.cameraRoll'),
      )
    }
  }

  renderNoPermissions = (): React.ReactNode => {
    const { didAskPermission } = this.state

    return (
      <View style={styles.placeholderView}>
        {!didAskPermission && <ActivityIndicator />}
        {didAskPermission && (
          <View>
            <Text type="title" style={styles.placeholderTitle}>
              {i18n.t('camera.placeholder.title')}
            </Text>
            <Button
              style={styles.askPermissionButton}
              type="default"
              title={i18n.t('camera.placeholder.askForPermissions')}
              onPress={this.openAppSettings}
            />
          </View>
        )}
      </View>
    )
  }

  closeModal = () => {
    this.props.navigation.pop()
  }

  changeFlashMode = () => {
    this.setState((state: State) => ({
      ...state,
      flashMode:
        state.flashMode === Camera.Constants.FlashMode.auto
          ? Camera.Constants.FlashMode.off
          : Camera.Constants.FlashMode.auto,
    }))
  }

  changeType = () => {
    this.setState((state: State) => ({
      ...state,
      side:
        state.side === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    }))
  }

  snap = async () => {
    Haptic.impact(Haptic.ImpactStyles.Heavy)
    this.setState({ canSnap: false })
    await this.cameraRef.current!.takePictureAsync({
      quality: 0.5,
      onPictureSaved: this.onPictureTaken,
    })
  }

  onPictureTaken = async (photo: PictureResponse) => {
    this.image = photo
    // @ts-ignore
    this.cameraRef.current!.pausePreview()
    this.setState({ canSnap: true, showDialog: true })
  }

  onDialogConfirm = async (description: string) => {
    const { uri, width, height } = this.image!

    await Storage.uploadImage({
      description,
      uri,
      width,
      height,
    })
    // await FileSystem.deleteAsync(`${FileSystem.documentDirectory}tempImage.jpg`)
    this.closeModal()
  }

  onDialogRetry = () => {
    this.setState({
      showDialog: false,
    })
    // @ts-ignore
    this.cameraRef.current!.resumePreview()
    this.image = null
  }

  onPickFromLibrary = async () => {
    await this.askLibraryPermissions()
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
    })

    if (!result.cancelled) {
      this.image = await resizeImage(result.uri)
      // @ts-ignore
      this.cameraRef.current!.pausePreview()
      this.setState({ canSnap: true, showDialog: true })
    }
  }

  render(): React.ReactNode {
    const {
      flashMode,
      side,
      hasCameraPermission,
      canSnap,
      showDialog,
    } = this.state

    return (
      <RNView style={styles.container}>
        {!hasCameraPermission && this.renderNoPermissions()}
        {hasCameraPermission && (
          <React.Fragment>
            <Camera
              // @ts-ignore
              ref={this.cameraRef}
              style={styles.camera}
              type={side}
              flashMode={flashMode}
            />
            <PictureUploadActionButtons
              canSnap={canSnap}
              flashEnabled={flashMode === Camera.Constants.FlashMode.auto}
              onChangeFlashMode={this.changeFlashMode}
              onChangeType={this.changeType}
              onClose={this.closeModal}
              onSnap={this.snap}
              onPickFromLibrary={this.onPickFromLibrary}
            />
            {showDialog && (
              <PictureUploadDialog
                onConfirm={this.onDialogConfirm}
                onRetry={this.onDialogRetry}
              />
            )}
          </React.Fragment>
        )}
      </RNView>
    )
  }
}
