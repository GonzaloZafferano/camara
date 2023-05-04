import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'camara.ionic.starter',
  appName: 'Relevamiento visual',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      backgroundColor: "#fffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
     androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      //splashImmersive: true,
      //layoutName: "launch_screen",
     // useDialog: true,
    },
  }, 
};

export default config;