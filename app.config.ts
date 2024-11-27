import { ExpoConfig, ConfigContext } from 'expo/config';

const PRIMARY_COLOR = '#161622';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: 'aora',
    slug: 'aora',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    backgroundColor: PRIMARY_COLOR,
    splash: {
      image: './assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: PRIMARY_COLOR,
    },
    scheme: 'aora',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: PRIMARY_COLOR,
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    newArchEnabled: true,
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    plugins: [
      'expo-router',
      'expo-font',
      ['expo-video', { supportsPictureInPicture: true }],
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos & videos to let you share them with others.',
        },
      ],
    ],
  };
};
