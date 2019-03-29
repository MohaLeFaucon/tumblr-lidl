export default {
  auth: {
    shared: {
      fields: {
        password: {
          placeholder: 'Mot de passe',
        },
      },
      buttons: {
        login: 'Connexion',
        register: 'Inscription',
        validate: 'Validate',
      },
    },
    register: {
      fields: {
        email: {
          placeholder: 'Adresse e-mail',
        },
        confirmPassword: {
          placeholder: 'Confirmer votre mot de passe',
        },
      },
    },
    login: {
      fields: {
        username: {
          placeholder: 'Adresse e-mail',
        },
      },
    },
    fillUserProfile: {
      fields: {
        username: {
          placeholder: "Entrez votre nom d'utilisateur...",
          errorMessage: {
            invalid:
              "Le nom d'utilisateur doit contenir au moins 6 caractères sans caractères spéciaux",
            alreadyExists: "Le nom d'utilisateur existe déjà",
          },
        },
      },
    },
  },
  shared: {
    alerts: {
      error: {
        title: 'Erreur',
      },
      permissions: {
        cameraRoll: "Veuillez autoriser l'accès à la bibiothèque de photos",
      },
      uploadFail:
        "L'envoi de l'image a échoué, vérifiez votre connexion internet ou réessayez plus tard",
      updateProfileFail:
        'La mise à jour du profil a échouée, veuillez réessayer',
      signinFail:
        'La connexion a échoué. Veuillez vérifier vos identifiants et réessayer',
      signupFail: "L'inscription a échoué. Veuillez réessayer",
      signoutFail: 'La déconnexion a échoué. Veuillez réessayer',
    },
    image: {
      loadError: "L'image n'a pas pu être chargée",
    },
  },
  home: {
    header: {
      title: 'Votre fil',
    },
  },
  likes: {
    header: {
      title: "Mentions J'aime",
    },
  },
  settings: {
    header: {
      title: 'Paramètres',
    },
    list: {
      appearence: {
        title: 'Apparence',
        items: {
          darkMode: 'Mode sombre',
        },
      },
      authentication: {
        title: 'Connexion',
        items: {
          signout: 'Se déconnecter',
        },
      },
    },
  },
  camera: {
    placeholder: {
      title:
        "Vous devez accepter les permissions d'accès à la caméra depuis les paramètres de l'application",
      askForPermissions: "Ouvrir les paramètres de l'application",
    },
    dialog: {
      title: 'Description',
      dismiss: 'Retour',
      confirm: 'Confirmer',
      input: {
        placeholder: 'Entrez votre description...',
      },
    },
  },
  picture: {
    likes: {
      one: "1 J'aime",
      other: "{{count}} J'aime",
      zero: "0 J'aime",
    },
  },
  comments: {
    header: {
      title: 'Commentaires',
    },
    input: {
      placeholder: 'Entrez un commentaire',
    },
  },
  userFeed: {
    subscribers: {
      one: 'abonné',
      other: 'abonnés',
      zero: 'abonné',
    },
    subscribing: {
      one: 'abonnement',
      other: 'abonnements',
      zero: 'abonnement',
    },
    posts: {
      one: 'publication',
      other: 'publications',
      zero: 'publication',
    },
    editButton: 'Editer le profil',
    editSuccess: 'Valider',
    subscribe: "S'abonner",
    unsubscribe: 'Se désabonner',
  },
  search: {
    input: {
      placeholder: 'Rechercher un utilisateur...',
    },
  },
}
