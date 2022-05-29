import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'con.manuelbelenapp.app',
  appName: 'manuelbelenapp',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: { "allowNavigation": ["https://manuelbelen.com/dev/wp-json/wp/v2/posts"] }
};

export default config;
