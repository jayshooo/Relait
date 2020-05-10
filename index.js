import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store from './src/store';

class RootComponent extends Component {
    render() {
        return (
            <Provider store={ Store }>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => RootComponent);
