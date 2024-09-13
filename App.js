import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import {AppState} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './redux/store';
import {checkToken} from './api/user';
import Toast from 'react-native-toast-message';

const App = () => {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('You have come back into the app');
          await checkToken();
          //we are coming from background to the foreground
        }

        appState.current = nextAppState;
      },
    );
    checkToken();
    console.log('Application has rendered');
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <RootNavigation />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
