import React from 'react';
import {Provider} from 'react-native-paper';
import {ToastProvider} from 'react-native-paper-toast';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import App from './src';
import {theme} from './src/core/theme';

const Main = () => (
  <SafeAreaProvider>
    <Provider theme={theme}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </SafeAreaProvider>
);

export default Main;
