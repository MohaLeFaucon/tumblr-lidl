import * as React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import { ThemeContextInterface, withTheme } from '../../../theme'
import ErrorBox from '../ErrorBox'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    minHeight: 32,
    alignItems: 'center',
    flex: 1,
  },
  errorMessage: {
    marginTop: 8,
  },
})

interface BaseProps extends TextInputProps {
  errorMessage?: string
  useTheme?: boolean
  children?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
}

interface Props extends BaseProps, ThemeContextInterface {}

type InputType = RNTextInput

const TextInput = React.forwardRef<InputType, Props>(
  (
    {
      style,
      errorMessage,
      useTheme = true,
      theme,
      themeName,
      children,
      containerStyle,
      contentStyle,
      ...props
    }: Props,
    ref?: React.Ref<InputType>,
  ) => {
    return (
      <View style={contentStyle}>
        <View
          style={[
            styles.container,
            useTheme && { backgroundColor: theme.inputs.backgroundColor },
            containerStyle,
          ]}
        >
          <RNTextInput
            underlineColorAndroid="transparent"
            style={[
              styles.textInput,
              style,
              useTheme && {
                color: theme.inputs.textColor,
              },
            ]}
            placeholderTextColor={
              useTheme ? theme.inputs.placeholderColor : undefined
            }
            keyboardAppearance={useTheme ? themeName : undefined}
            {...props}
            ref={ref}
          />
          {children}
        </View>
        {errorMessage && (
          <ErrorBox
            errorMessage={errorMessage}
            containerStyle={styles.errorMessage}
          />
        )}
      </View>
    )
  },
)

// @ts-ignore
export default withTheme<BaseProps>(TextInput)
