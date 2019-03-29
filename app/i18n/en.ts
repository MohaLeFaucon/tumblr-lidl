export default {
  auth: {
    shared: {
      fields: {
        password: {
          placeholder: 'Password',
        },
      },
      buttons: {
        login: 'Login',
        register: 'Register',
        validate: 'Validate',
      },
    },
    register: {
      fields: {
        email: {
          placeholder: 'Email',
        },
        confirmPassword: {
          placeholder: 'Confirm your password',
        },
      },
    },
    login: {
      fields: {
        username: {
          placeholder: 'Email address',
        },
      },
    },
    fillUserProfile: {
      fields: {
        username: {
          placeholder: 'Type your username...',
          errorMessage: {
            invalid:
              'Username must contain at least 6 characters without special characters',
            alreadyExists: 'Username already exists',
          },
        },
      },
    },
  },
  shared: {
    alerts: {
      error: {
        title: 'Error',
      },
      permissions: {
        cameraRoll: 'Please enable camera roll permissions',
        camera: 'Please enable camera permissions',
      },
      uploadFail:
        'Failed to upload the image, please check your internet connection or try again later',
      updateProfileFail: 'Failed to update profile, please try again later',
      signinFail:
        'Failed to signin. Please check your credentials and try again',
      signupFail: 'Failed to signup. Please try again',
      signoutFail: 'Failed to signout. Please try again',
    },
    image: {
      loadError: 'Failed to load the image',
    },
  },
  home: {
    header: {
      title: 'Your feed',
    },
  },
  likes: {
    header: {
      title: 'Likes mentions',
    },
  },
  settings: {
    header: {
      title: 'Settings',
    },
    list: {
      appearence: {
        title: 'Appearence',
        items: {
          darkMode: 'Dark Mode',
        },
      },
      authentication: {
        title: 'Authentication',
        items: {
          signout: 'Sign out',
        },
      },
    },
  },
  camera: {
    placeholder: {
      title: 'You need to accept the camera permissions from the app settings',
      askForPermissions: 'Open app settings',
    },
    dialog: {
      title: 'Image description',
      dismiss: 'Dismiss',
      confirm: 'Confirm',
      input: {
        placeholder: 'Type your description...',
      },
    },
  },
  picture: {
    likes: {
      one: '1 like',
      other: '{{count}} likes',
      zero: '0 like',
    },
  },
  comments: {
    header: {
      title: 'Comments',
    },
    input: {
      placeholder: 'Type a comment...',
    },
  },
  userFeed: {
    subscribers: {
      one: 'subscriber',
      other: 'subscribers',
      zero: 'subscriber',
    },
    subscribing: {
      one: 'subscription',
      other: 'subscriptions',
      zero: 'subscription',
    },
    posts: {
      one: 'post',
      other: 'posts',
      zero: 'post',
    },
    editButton: 'Edit profile',
    editSuccess: 'Confirm',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
  },
  search: {
    input: {
      placeholder: 'Search an user...',
    },
  },
}
