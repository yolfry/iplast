import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'con.iplast.app',
  appName: 'Iplast',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: { "allowNavigation": ["https://manuelbelen.com/dev/wp-json/wp/v2/posts"] }
};

export default config;
