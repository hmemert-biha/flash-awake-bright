import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9547f6d611e54c089bc2ff02e6c3aa39',
  appName: 'FlashAlarm',
  webDir: 'dist',
  server: {
    url: 'https://9547f6d6-11e5-4c08-9bc2-ff02e6c3aa39.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
    },
  },
};

export default config;
